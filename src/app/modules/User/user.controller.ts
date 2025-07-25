import { Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import status from 'http-status';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.body;
  const result = await UserService.createUsers(user);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User Created Successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
};
