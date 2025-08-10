import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { FacultyService } from './faculty.service';
import sendResponse from '../../../shared/sendResponse';
import status from 'http-status';
import pick from '../../../shared/pick';
import { facultyFilterableFields } from './faculty.constant';
import { paginationFields } from '../../../constants/paginations';
import { IFaculty } from './faculty.interface';

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FacultyService.getSingleFaculty(id);

  sendResponse<IFaculty>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty retrive successfully',
    data: result,
  });
});

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await FacultyService.getAllFaculty(filters, paginationOptions);

  sendResponse<IFaculty[]>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty retrive successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await FacultyService.updateFaculty(id, updatedData);

  sendResponse<IFaculty>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  });
});

export const FacultyController = {
  getSingleFaculty,
  getAllFaculty,
  updateFaculty,
};
