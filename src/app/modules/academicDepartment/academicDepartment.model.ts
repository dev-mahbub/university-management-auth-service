import { model, Schema } from 'mongoose';
import {
  IAcademicDepartment,
  IAcademicDepartmentModel,
} from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<IAcademicDepartment>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  academicFaculty: {
    type: String,
    required: true,
  },
});

export const AcademicDepartment = model<
  IAcademicDepartment,
  IAcademicDepartmentModel
>('AcademicDepartment', academicDepartmentSchema);
