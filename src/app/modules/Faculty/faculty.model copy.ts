import { model, Schema } from 'mongoose';
import { IFaculty, IFacultyModel } from './faculty.interface';

const facultySchema = new Schema<IFaculty>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    middle_name: {
      type: String,
    },
    last_name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact_no: {
      type: String,
      required: true,
    },
    emergency_contact_no: {
      type: String,
      required: true,
    },
    present_address: {
      type: String,
      required: true,
    },
    permanent_address: {
      type: String,
      required: true,
    },
    blood_group: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    academic_department: {
      type: String,
      required: true,
    },
    academic_faculty: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Faculty = model<IFaculty, IFacultyModel>('Faculty', facultySchema);
