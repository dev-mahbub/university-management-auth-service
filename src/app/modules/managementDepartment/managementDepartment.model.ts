import { model, Schema } from 'mongoose';
import {
  IManagementDepartment,
  IMangementDepartmentModel,
} from './managementDepartment.interface';

const managementDepartmentSchema = new Schema<IManagementDepartment>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const ManagementDepartment = model<
  IManagementDepartment,
  IMangementDepartmentModel
>('managementDepartment', managementDepartmentSchema);
