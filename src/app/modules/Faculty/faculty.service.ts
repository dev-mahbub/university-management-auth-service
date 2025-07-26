import { IFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';
import { generatedFacultyId } from './faculty.utils';

//create faculty
const createFaculty = async (faculty: IFaculty): Promise<IFaculty> => {
  const id = await generatedFacultyId();
  const newFaculty: IFaculty = { ...faculty, id };
  console.log('Creating faculty with ID:', newFaculty.id);

  const result = await Faculty.create(newFaculty);
  return result;
};

export const FacultyService = {
  createFaculty,
};
