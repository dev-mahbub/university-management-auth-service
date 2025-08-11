import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AdminService } from './admin.service';
import sendResponse from '../../../shared/sendResponse';
import status from 'http-status';
import pick from '../../../shared/pick';
import { adminFilterableFields } from './admin.constant';
import { paginationFields } from '../../../constants/paginations';

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.getSingleAdmin(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin retrive successfully',
    data: result,
  });
});

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await AdminService.getAllAdmin(filters, paginationOptions);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin retrive successfully',
    meta: result.meta,
    data: result.data,
  });
});
const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await AdminService.updatedAdmin(id, updatedData);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin updated successfully',
    data: result,
  });
});

export const AdminController = {
  getSingleAdmin,
  getAllAdmin,
  updateAdmin,
};
