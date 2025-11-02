// src/modules/auth/auth.service.ts
import bcrypt from 'bcryptjs';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface'; // We'll create this next
import { createToken } from './auth.utils';
import dotenv from 'dotenv';

dotenv.config();

const loginUser = async (payload: TLoginUser) => {
  // 1. Check if user exists
  const user = await User.findOne({ email: payload.email }).select('+password');
  if (!user) {
    throw new Error('User not found');
  }

  // 2. Check if password matches
  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Invalid credentials');
  }

  // 3. Create tokens
  const jwtPayload = {
    userId: user._id.toString(),
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    process.env.JWT_SECRET as string,
    '1d', // Access token expires in 1 day
  );

  const refreshToken = createToken(
    jwtPayload,
    process.env.JWT_REFRESH_SECRET as string,
    '30d', // Refresh token expires in 30 days
  );

  // Return user data without password and the tokens
  const { password, ...userWithoutPassword } = user.toObject();

  return {
    user: userWithoutPassword,
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  loginUser,
};