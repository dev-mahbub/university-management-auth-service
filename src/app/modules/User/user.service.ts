import { IUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentId } from './user.utils';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import status from 'http-status';
import { IStudent } from '../student/student.interface';
import { AcademicSemester } from '../academicSemister/academicSemester.model';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';

const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null> => {
  //default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester,
  );

  let newUserAllData = null;
  //start session
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //generate student id
    const id = await generatedStudentId(academicSemester);
    student.id = id;
    user.id = id;

    //array
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(status.BAD_REQUEST, 'Failed to create student');
    }

    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(status.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = {
  createStudent,
};
