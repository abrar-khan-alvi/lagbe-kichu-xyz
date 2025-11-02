// src/modules/user/user.controller.ts
import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const result = await UserServices.createUserIntoDB(userData);

    // Send a structured success response
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: {
        // Explicitly map the fields to ensure password is not returned
        _id: result._id,
        email: result.email,
        role: result.role,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      },
    });
  } catch (error: any) {
    // Send a structured error response
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the user.',
      error: error.message,
    });
  }
};
const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await UserServices.getAllUsersFromDB();
        res.status(200).json({ success: true, message: 'Users retrieved', data: result });
    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Failed to retrieve users' });
    }
};

const updateUserStatus = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { status } = req.body;
        const result = await UserServices.updateUserStatusInDB(userId, status);
        res.status(200).json({ success: true, message: 'User status updated', data: result });
    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Failed to update user status' });
    }
};
export const UserControllers = {
  createUser,
  getAllUsers,
  updateUserStatus,
};