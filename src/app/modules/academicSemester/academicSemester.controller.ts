import { Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import status from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/paginations';
import { IAcademicSemester } from './academicSemester.interface';
import { academicSemesterFilterableFields } from './academicSemester.constants';

//create data
const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body;
  const result =
    await AcademicSemesterService.createSemester(academicSemesterData);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Semester Created Successfully',
    data: result,
  });
});

//read single data
const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.getSingleSemester(id);

  sendResponse<IAcademicSemester>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Semester retrieved successfully !',
    data: result,
  });
});

//read all data
const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemesterFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicSemesterService.getAllSemesters(
    filters,
    paginationOptions,
  );

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Semester retrieved Successfully',
    meta: result.meta,
    data: result.data,
  });
});

//update semester
const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await AcademicSemesterService.updateSemester(id, updatedData);

  sendResponse<IAcademicSemester>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Semester updated successfully !',
    data: result,
  });
});

//delete semester
const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicSemesterService.deleteSemester(id);

  sendResponse<IAcademicSemester>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Semester deleted successfully !',
    data: result,
  });
});

export const AcademicSemesterController = {
  createSemester,
  getSingleSemester,
  getAllSemesters,
  updateSemester,
  deleteSemester,
};
