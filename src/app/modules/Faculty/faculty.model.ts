import { model, Schema } from 'mongoose';
import { IFaculty, IFacultyModel } from './faculty.interface';

const facultySchema = new Schema<IFaculty>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Faculty = model<IFaculty, IFacultyModel>('Faculty', facultySchema);
