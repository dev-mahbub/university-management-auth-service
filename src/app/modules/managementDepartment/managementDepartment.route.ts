import express from 'express';
import { ManagementDepartmentController } from './managementDepartment.controller';

const router = express.Router();

router.post(
  '/create-management',
  ManagementDepartmentController.createManagementDepartment,
);
router.get(
  '/:id',
  ManagementDepartmentController.getSingleManagementDepartment,
);
router.get('/', ManagementDepartmentController.getAllManagementDepartment);
router.patch('/:id', ManagementDepartmentController.updateManagementDepartment);
router.delete(
  '/:id',
  ManagementDepartmentController.deleteManagementDepartment,
);

export const ManagementDepartmentRoutes = router;
