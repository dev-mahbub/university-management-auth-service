import mongoose, { model } from 'mongoose';
import {
  AcademicSemesterCodes,
  AcademicSemesterMonth,
  AcademicSemesterTitle,
} from './academicSemester.constants';
import {
  IAcademicSemester,
  IAcademicSemesterModel,
} from './academicSemester.interface';
import ApiError from '../../../errors/ApiError';
import status from 'http-status';
const { Schema } = mongoose;

const academicSemesterSchema = new Schema<IAcademicSemester>({
  title: {
    type: String,
    required: true,
    enum: AcademicSemesterTitle,
  },
  year: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    enum: AcademicSemesterCodes,
  },
  startMonth: {
    type: String,
    required: true,
    enum: AcademicSemesterMonth,
  },
  endMonth: {
    type: String,
    required: true,
    enum: AcademicSemesterMonth,
  },
});

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Academic semester is already exist !');
  }
  next();
});

export const AcademicSemester = model<
  IAcademicSemester,
  IAcademicSemesterModel
>('AcademicSemester', academicSemesterSchema);
