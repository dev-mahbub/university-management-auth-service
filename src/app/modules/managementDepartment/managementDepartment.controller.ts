import status from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ManagementDepartmentService } from './managementDepartment.service';
import { Request, Response } from 'express';
import pick from '../../../shared/pick';
import { managementDepartmentFilteratbleFields } from './managementDepartment.constant';
import { paginationFields } from '../../../constants/paginations';

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...departmentData } = req.body;
    const result =
      await ManagementDepartmentService.createManagementDepartment(
        departmentData,
      );

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Management Department created successfully',
      data: result,
    });
  },
);

const getSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await ManagementDepartmentService.getSingleManagementDepartment(id);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Management Department retrive successfully',
      data: result,
    });
  },
);

const getAllManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, managementDepartmentFilteratbleFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await ManagementDepartmentService.getAllManagementDepartment(
      filters,
      paginationOptions,
    );

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Management Department retrive successfully',
      meta: result.meta,
      data: result.data,
    });
  },
);

const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = ManagementDepartmentService.updateManagementDepartment(
      id,
      updatedData,
    );

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Management Department updated successfully',
      data: result,
    });
  },
);

const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await ManagementDepartmentService.deleteManagementDepartment(id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Management Department deleted successfully',
      data: result,
    });
  },
);

export const ManagementDepartmentController = {
  createManagementDepartment,
  getSingleManagementDepartment,
  getAllManagementDepartment,
  updateManagementDepartment,
  deleteManagementDepartment,
};
