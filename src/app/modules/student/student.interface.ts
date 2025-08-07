import { Model, Schema } from 'mongoose';
import { IAcademicSemester } from '../academicSemister/academicSemester.interface';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';

export type IUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type IGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
};

export type IlocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type IStudent = {
  id: string;
  name: IUserName;
  dateOfBirth: string;
  gender: 'male' | 'female';
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: 'A+' | 'B+' | 'A-' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  guardian: IGuardian;
  localGuardian: IlocalGuardian;
  academicSemester: Schema.Types.ObjectId | IAcademicSemester;
  academicDepartment: Schema.Types.ObjectId | IAcademicDepartment;
  academicFaculty: Schema.Types.ObjectId | IAcademicFaculty;
  profileImage?: string;
};

export type IStudentFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};

export type StudentModel = Model<IStudent, Record<string, unknown>>;
