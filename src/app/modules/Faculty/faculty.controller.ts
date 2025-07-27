import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { FacultyService } from './faculty.service';
import sendResponse from '../../../shared/sendResponse';
import status from 'http-status';
import pick from '../../../shared/pick';
import { facultyFilteratbleFields } from './faculty.constants';
import { paginationFields } from '../../../constants/paginations';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...facultyData } = req.body;
  const result = await FacultyService.createFaculty(facultyData);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty created successfully !',
    data: result,
  });
});

//read single faculty
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.getSingleFaculty(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Semester retrive successfully !',
    data: result,
  });
});

//update faculty
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await FacultyService.updateFaculty(id, payload);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  });
});

//read all faculty
const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilteratbleFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await FacultyService.getAllFaculty(filters, paginationOptions);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Semester retrive successfully !',
    meta: result.meta,
    data: result.data,
  });
});

export const FacultyController = {
  createFaculty,
  getSingleFaculty,
  getAllFaculty,
  updateFaculty,
};
