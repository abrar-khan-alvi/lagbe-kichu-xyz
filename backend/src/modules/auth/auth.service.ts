import bcrypt from 'bcryptjs';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface'; 
import { createToken } from './auth.utils';
import dotenv from 'dotenv';

dotenv.config();

const loginUser = async (payload: TLoginUser) => {

  const user = await User.findOne({ email: payload.email }).select('+password');
  if (!user) {
    throw new Error('User not found');
  }


  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Invalid credentials');
  }


  const jwtPayload = {
    userId: user._id.toString(),
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    process.env.JWT_SECRET as string,
    '1d',
  );

  const refreshToken = createToken(
    jwtPayload,
    process.env.JWT_REFRESH_SECRET as string,
    '30d', 
  );

 
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