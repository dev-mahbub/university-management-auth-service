import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import status from 'http-status';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academiSemesterData } = req.body;
    const result =
      await AcademicSemesterService.createSemester(academiSemesterData);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Academic Semester Created Successfully',
      data: result,
    });

    next();
  },
);

export const AcademicSemesterController = {
  createSemester,
};
