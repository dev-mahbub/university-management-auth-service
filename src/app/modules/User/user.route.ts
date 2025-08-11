import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

//student as user route
router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentOfUserZodSchema),
  UserController.createStudent,
);

// delete student as user route
router.delete('/student/:id', UserController.deleteStudent);

//faculty as user route
router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyOfUserZodSchema),
  UserController.createFaculty,
);

// delete faculty as user route
router.delete('/faculty/:id', UserController.deleteFaculty);

//admin route
router.post('/create-admin', UserController.createAdmin);

// delete admin as user route
router.delete('/admin/:id', UserController.deleteAdmin);

export const UserRoutes = router;
