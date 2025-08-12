import { IUser } from './user.interface';
import { User } from './user.model';
import {
  generatedAdminId,
  generatedStudentId,
  genereatedFacultyId,
} from './user.utils';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import status from 'http-status';
import { IStudent } from '../student/student.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';

//create student and user
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

//create faculty and user
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

const createAdmin = async (
  admin: IAdmin,
  user: IUser,
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_admin_pass as string;
  }

  user.role = 'admin';

  let newUserAllData = null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const id = await generatedAdminId();
    admin.id = id;
    user.id = id;

    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(status.NOT_FOUND, 'Admin not found');
    }

    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(status.NOT_FOUND, 'User not found');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }
  return newUserAllData;
};

const deleteAdmin = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const user = await User.findOne({ id }).session(session);
    if (!user) {
      throw new ApiError(status.NOT_FOUND, 'User not found');
    }

    await Admin.findByIdAndDelete(user.admin, { session });
    await User.findByIdAndDelete(user._id, { session });

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
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
  createAdmin,
  deleteAdmin,
};
