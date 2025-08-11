import express from 'express';
import { AdminController } from './admin.controller';

const router = express.Router();

router.get('/:id', AdminController.getSingleAdmin);

router.get('/', AdminController.getAllAdmin);

router.patch('/:id', AdminController.updateAdmin);

export const AdminRoutes = router;
