// src/modules/user/user.service.ts
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const updateUserStatusInDB = async (userId: string, status: 'active' | 'suspended') => {
  const result = await User.findByIdAndUpdate(userId, { status }, { new: true });
  return result;
};
export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  updateUserStatusInDB,
};