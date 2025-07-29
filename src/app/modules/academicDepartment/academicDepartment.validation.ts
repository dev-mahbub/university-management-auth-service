import { z } from 'zod';

const createDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string(),
    academicFaculty: z.string(),
  }),
});

export const AcademicDepartmentValidation = {
  createDepartmentZodSchema,
};
