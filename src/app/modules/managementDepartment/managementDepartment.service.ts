import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { managementDepartmentSearchableFields } from './managementDepartment.constant';
import {
  IDepartmentFilters,
  IManagementDepartment,
} from './managementDepartment.interface';
import { ManagementDepartment } from './managementDepartment.model';

const createDepartment = async (
  departmentData: IManagementDepartment,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.create(departmentData);
  return result;
};

const getSingleDepartment = async (
  id: string,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findById(id);
  return result;
};

const getAllDepartment = async (
  filters: IDepartmentFilters,
  paginationOptions: IPaginationOptions,
) => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: managementDepartmentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    Object.entries(filtersData).map(([field, value]) => ({
      [field]: value,
    }));
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await ManagementDepartment.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = ManagementDepartment.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const deleteManagementDepartment = async (
  id: string,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findByIdAndDelete(id);
  return result;
};

export const ManagementService = {
  createDepartment,
  getSingleDepartment,
  getAllDepartment,
  deleteManagementDepartment,
};
