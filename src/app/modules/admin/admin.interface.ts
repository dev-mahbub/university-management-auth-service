import { Model, Schema } from 'mongoose';
import { IManagementDepartment } from '../managementDepartment/managementDepartment.interface';

export type IAdminUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type IAdmin = {
  id: string;
  name: IAdminUserName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  designation: string;
  managementDepartment: Schema.Types.ObjectId | IManagementDepartment;
  profileImage?: string;
};

export type IAdminModel = Model<IAdmin, Record<string, unknown>>;

export type IAdminFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
