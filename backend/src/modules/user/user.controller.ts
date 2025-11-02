import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const result = await UserServices.createUserIntoDB(userData);

    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: {
        _id: result._id,
        email: result.email,
        role: result.role,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      },
    });
  } catch (error: any) {
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