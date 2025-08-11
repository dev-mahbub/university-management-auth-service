import { z } from 'zod';

//create validation
const createManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

//update validation
const updateManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

export const ManagementDepartmentValidation = {
  createManagementDepartmentZodSchema,
  updateManagementDepartmentZodSchema,
};
