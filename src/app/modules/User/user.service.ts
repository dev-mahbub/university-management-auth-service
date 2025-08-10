import { IUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentId, genereatedFacultyId } from './user.utils';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import status from 'http-status';
import { IStudent } from '../student/student.interface';
import { AcademicSemester } from '../academicSemister/academicSemester.model';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';

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

//delete student and user
const deleteStudent = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const user = await User.findOne({ id }).session(session);

    if (!user) {
      throw new ApiError(status.NOT_FOUND, 'Student user not found');
    }

    await Student.findByIdAndDelete(user.student, { session });
    await User.findByIdAndDelete(user._id, { session });

    session.commitTransaction();
    session.endSession();
  } catch (error) {
    session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

//create faculty
const createFaculty = async (
  faculty: IFaculty,
  user: IUser,
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }

  user.role = 'faculty';

  let newUserAllData = null;

  //start session
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await genereatedFacultyId();
    faculty.id = id;
    user.id = id;

    const newFaculty = await Faculty.create([faculty], { session });

    if (!newFaculty.length) {
      throw new ApiError(status.BAD_REQUEST, 'Failed to create faculty');
    }

    user.faculty = newFaculty[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(status.BAD_REQUEST, 'Failed to create User ');
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
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  return newUserAllData;
};

//delete faculty and user
const deleteFaculty = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const user = await User.findOne({ id }).session(session);

    if (!user) {
      throw new ApiError(status.NOT_FOUND, 'Faculty user not found');
    }

    await Faculty.findByIdAndDelete(user.faculty, { session });
    await User.findByIdAndDelete(user._id, { session });

    session.commitTransaction();
    session.endSession();
  } catch (error) {
    session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const UserService = {
  createStudent,
  deleteStudent,
  createFaculty,
  deleteFaculty,
};
