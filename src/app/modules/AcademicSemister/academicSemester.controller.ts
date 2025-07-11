import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import status from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/paginations';
import {
  academicSemesterFilterableFields,
  IAcademicSemester,
} from './academicSemester.interface';

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

const getSingleSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await AcademicSemesterService.getSingleSemester(id);

    sendResponse<IAcademicSemester>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Semester retrieved successfully !',
      data: result,
    });

    next();
  },
);

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

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
    next();
  },
);

export const AcademicSemesterController = {
  createSemester,
  getSingleSemester,
  getAllSemesters,
};
