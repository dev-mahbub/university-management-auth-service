import { Model } from 'mongoose';

export type IFaculty = {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  email: string;
  contact_no: string;
  emergency_contact_no: string;
  present_address: string;
  permanent_address: string;
  blood_group: string;
  designation: string;
  academic_department: string;
  academic_faculty: string;
};

export type IFacultyModel = Model<IFaculty, Record<string, unknown>>;
