import { Model } from 'mongoose';

export type IFaculty = {
  id: string;
  title: string;
};

export type IFacultyModel = Model<IFaculty, Record<string, unknown>>;
