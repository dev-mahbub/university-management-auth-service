import { Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import status from 'http-status';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;
  const result = await UserService.createStudent(student, userData);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User Created Successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteStudent(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...userData } = req.body;
  const result = await UserService.createFaculty(faculty, userData);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty created successfully',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteFaculty(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty deleted successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { admin, ...userData } = req.body;
  const result = await UserService.createAdmin(admin, userData);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteAdmin(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin deleted successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  deleteStudent,
  createFaculty,
  deleteFaculty,
  createAdmin,
  deleteAdmin,
};
