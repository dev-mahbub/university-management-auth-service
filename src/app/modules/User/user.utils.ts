import { IAcademicSemester } from '../academicSemister/academicSemester.interface';
import { User } from './user.model';

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

export const generatedStudentId = async (
  academicSemester: IAcademicSemester | null,
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');
  let increamentedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  increamentedId = `${academicSemester?.year.substring(2)}${academicSemester?.code}${increamentedId}`;
  return increamentedId;
};

//Faculty generate id

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const genereatedFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  let increamentedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  increamentedId = `${'F-'}${increamentedId}`;

  return increamentedId;
};

//generated admin id
export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generatedAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');
  let increamentedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  increamentedId = `A-${increamentedId}`;

  return increamentedId;
};
