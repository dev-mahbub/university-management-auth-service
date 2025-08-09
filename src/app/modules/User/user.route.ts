import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

//student route
router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentOfUserZodSchema),
  UserController.createStudent,
);

//faculty route
router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyOfUserZodSchema),
  UserController.createFaculty,
);

//admin route
router.post('/create-admin');

export const UserRoutes = router;
