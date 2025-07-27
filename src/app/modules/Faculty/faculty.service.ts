import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { facultySearchableFields } from './faculty.constants';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { Faculty } from './faculty.model';
import { generatedFacultyId } from './faculty.utils';

//create faculty
const createFaculty = async (faculty: IFaculty): Promise<IFaculty> => {
  const id = await generatedFacultyId();
  const newFaculty: IFaculty = { ...faculty, id };
  console.log('Creating faculty with ID:', newFaculty.id);

  const result = await Faculty.create(newFaculty);
  return result;
};

//read single faculty
const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id);
  return result;
};

//update faculty
const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>,
): Promise<IFaculty | null> => {
  const result = await Faculty.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

//read all faculty
const getAllFaculty = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions,
) => {
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  //partial search
  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $opions: 'i',
        },
      })),
    });
  }

  //exect match
  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  //pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Faculty.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Faculty.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const FacultyService = {
  createFaculty,
  getSingleFaculty,
  getAllFaculty,
  updateFaculty,
};
