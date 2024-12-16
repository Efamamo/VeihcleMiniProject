import { Router } from 'express';
import { check } from 'express-validator';
import {
  addVehicle,
  getVehicles,
  updateStatus,
} from '../controllers/vehicle.js';

export const veihcleRouter = Router();

veihcleRouter.get('/', getVehicles);
veihcleRouter.post(
  '/',
  [
    check('name').notEmpty().withMessage('name is required'),
    check('status').notEmpty().withMessage('status is required'),
  ],
  addVehicle
);
veihcleRouter.patch('/:id', updateStatus);
