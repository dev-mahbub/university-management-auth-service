import { Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import status from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/paginations';
import { academicSemesterFilterableFields } from './academicSemester.interface';

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...academiSemesterData } = req.body;
  const result =
    await AcademicSemesterService.createSemester(academiSemesterData);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Semester Created Successfully',
    data: result,
  });
});

// const createSemester = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { ...academiSemesterData } = req.body;
//     const result =
//       await AcademicSemesterService.createSemester(academiSemesterData);

//     sendResponse(res, {
//       statusCode: status.OK,
//       success: true,
//       message: 'Academic Semester Created Successfully',
//       data: result,
//     });

//     next();
//   },
// );

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemesterFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicSemesterService.getAllSemesters(
    filters,
    paginationOptions,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Semester retrieved Successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
};
