import express from 'express';
import { FacultyController } from './faculty.controller';

const router = express.Router();

router.post('/create-faculty', FacultyController.createFaculty);
router.get('/:id', FacultyController.getSingleFaculty);
router.get('/', FacultyController.getAllFaculty);
router.patch('/:id', FacultyController.updateFaculty);
router.delete('/:id', FacultyController.deleteFaculty);

export const FacultyRoutes = router;
