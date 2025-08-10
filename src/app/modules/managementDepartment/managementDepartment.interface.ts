import { Model } from 'mongoose';

export type IManagementDepartment = {
  id: string;
  title: string;
};

export type IMangementDepartmentModel = Model<
  IManagementDepartment,
  Record<string, unknown>
>;

export type IDepartmentFilters = {
  searchTerm?: string;
  title?: string;
};
