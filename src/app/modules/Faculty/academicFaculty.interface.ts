import { Model } from 'mongoose';

export type IAcademicFaculty = {
  id: string;
  title: string;
};

export type IAcademicFacultyFilters = {
  searchTerm?: string;
  title?: string;
};

export type IAcademicFacultyModel = Model<
  IAcademicFaculty,
  Record<string, unknown>
>;
