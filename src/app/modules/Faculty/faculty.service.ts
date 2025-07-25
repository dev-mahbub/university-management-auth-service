import { generatedUserId } from '../User/user.utils';
import { IFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';

//create faculty
const createFaculty = async (faculty: IFaculty): Promise<IFaculty> => {
  const id = await generatedUserId();
  faculty.id = id;
  const result = await Faculty.create(faculty);
  return result;
};

export const FacultyService = {
  createFaculty,
};
