import { Vehicle } from '../models/vehicle.js';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    return res.json(vehicles);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
};

export const addVehicle = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = {};
      errors.array().forEach((error) => {
        formattedErrors[error.path] = error.msg;
      });

      return res.status(400).json({ errors: formattedErrors });
    }

    const { name, status } = req.body;

    if (
      status.trim().toLowerCase() != 'pending' &&
      status.trim().toLowerCase() != 'available' &&
      status.trim().toLowerCase() != 'unavailable'
    ) {
      return res.status(400).json({
        error: 'Status should be either pending | available | unavailable',
      });
    }

    const vehicle = new Vehicle({
      name,
      status,
    });

    await vehicle.save();
    return res.status(201).json(vehicle);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'server error' });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const {status} = res.body

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Vehicle ID' });
    }

    if (
        status.trim().toLowerCase() != 'pending' &&
        status.trim().toLowerCase() != 'available' &&
        status.trim().toLowerCase() != 'unavailable'
      ) {
        return res.status(400).json({
          error: 'Status should be either pending | available | unavailable',
        });
      }

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    vehicle.status = status;
    await vehicle.save()

    res.json(vehicle)

    
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'server error' });
  }
};
