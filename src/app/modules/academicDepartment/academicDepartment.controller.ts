import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicDepartmentService } from './academicDepartment.service';
import sendResponse from '../../../shared/sendResponse';
import status from 'http-status';
import pick from '../../../shared/pick';
import { AcademicDepartmentFilterableFields } from './academicDepartment.constants';
import { paginationFields } from '../../../constants/paginations';
import { IAcademicDepartment } from './academicDepartment.interface';

//create department
const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartmentData } = req.body;
  const result = await AcademicDepartmentService.createDepartment(
    academicDepartmentData,
  );

  sendResponse<IAcademicDepartment>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic department created successfully !',
    data: result,
  });
});

//get single department
const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.getSingleDepartment(id);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Department retrive successfully',
    data: result,
  });
});

//get all department
const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, AcademicDepartmentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicDepartmentService.getAllDepartment(
    filters,
    paginationOptions,
  );

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Department retrive successfully !',
    meta: result.meta,
    data: result.data,
  });
});

//updated department
const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const departmentData = req.body;
  const result = await AcademicDepartmentService.updateDepartment(
    id,
    departmentData,
  );

  sendResponse<IAcademicDepartment>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Department updated successfully !',
    data: result,
  });
});

//delete Department
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.deleteDepartment(id);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Department deleted successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createDepartment,
  getSingleDepartment,
  getAllDepartment,
  updateDepartment,
  deleteDepartment,
};
