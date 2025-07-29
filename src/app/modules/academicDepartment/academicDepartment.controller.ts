import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicDepartmentService } from './academicDepartment.service';
import sendResponse from '../../../shared/sendResponse';
import status from 'http-status';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const departmentData = req.body;
  const result =
    await AcademicDepartmentService.createDepartment(departmentData);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic department created successfully !',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createDepartment,
};
