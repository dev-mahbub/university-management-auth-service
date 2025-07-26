import { Faculty } from './faculty.model';

export const findLastFacultyId = async () => {
  const lastFaculty = await Faculty.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastFaculty?.id;
};

export const generatedFacultyId = async () => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  const increamentId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  return increamentId;
};
