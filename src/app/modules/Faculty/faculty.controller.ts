import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { FacultyService } from './faculty.service';
import sendResponse from '../../../shared/sendResponse';
import status from 'http-status';

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

export const FacultyController = {
  createFaculty,
};
