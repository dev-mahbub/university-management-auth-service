import { Model } from 'mongoose';

export type IAcademicDepartment = {
  title: string;
  academicFaculty: string;
};

export type IAcademicDepartmentFilters = {
  searchTerm?: string;
  title?: string;
  academicFaculty?: string;
};

export type IAcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>;
