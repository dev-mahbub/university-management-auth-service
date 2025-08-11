import { model, Schema } from 'mongoose';
import { bloodGroup, gender } from '../user/user.constant';
import { IAdmin, IAdminModel } from './admin.interface';

const adminSchema = new Schema<IAdmin, IAdminModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: {
        firstName: { type: String, required: true },
        middleName: { type: String }, // optional
        lastName: { type: String, required: true },
      },
      required: true,
    },
    gender: {
      type: String,
      enum: gender,
      required: true,
    },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: bloodGroup, // optional
    },
    designation: { type: String, required: true },
    managementDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'managementDepartment',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

export const Admin = model<IAdmin, IAdminModel>('Admin', adminSchema);
