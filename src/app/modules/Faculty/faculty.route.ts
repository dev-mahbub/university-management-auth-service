import express from 'express';
import { FacultyController } from './faculty.controller';

const router = express.Router();

router.post('/create-faculty', FacultyController.createFaculty);
router.get('/:id', FacultyController.getSingleFaculty);
router.get('/', FacultyController.getAllFaculty);

export const FacultyRoutes = router;
