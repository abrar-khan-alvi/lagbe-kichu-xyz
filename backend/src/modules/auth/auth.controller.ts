import { Request, Response } from 'express';
import { AuthServices } from './auth.service';

const loginUser = async (req: Request, res: Response) => {
  try {
    const loginData = req.body;
    const result = await AuthServices.loginUser(loginData);

    const { refreshToken, ...otherData } = result;

   
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
    });

 
    res.status(200).json({
      success: true,
      message: 'User logged in successfully!',
      data: otherData,
    });
  } catch (error: any) {

    res.status(401).json({
      success: false,
      message: 'Login failed',
      error: error.message,
    });
  }
};

export const AuthControllers = {
  loginUser,
};