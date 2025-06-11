import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academiSemesterData } = req.body;
    const result =
      await AcademicSemesterService.createSemester(academiSemesterData);
    res.status(200).json({
      success: true,
      message: 'Academic Semester is Created Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const AcademicSemesterController = {
  createSemester,
};
