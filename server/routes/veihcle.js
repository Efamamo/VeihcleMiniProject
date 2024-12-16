import { Router } from 'express';
import { check } from 'express-validator';
import {
  addVehicle,
  getVehicles,
  updateStatus,
} from '../controllers/vehicle.js';

export const veihcleRouter = Router();

veihcleRouter.get('/', getVehicles);
veihcleRouter.post('/', addVehicle);
veihcleRouter.patch('/:id', updateStatus);
