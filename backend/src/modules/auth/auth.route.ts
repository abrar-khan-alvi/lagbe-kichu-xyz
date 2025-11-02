import express from 'express';
import { UserControllers } from '../user/user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createUserValidationSchema } from '../user/user.validation';
import { AuthControllers } from './auth.controller'; 
import { loginValidationSchema } from './auth.validation';

const router = express.Router();


router.post(
  '/register',
  validateRequest(createUserValidationSchema),
  UserControllers.createUser,
);


router.post(
  '/login',
  validateRequest(loginValidationSchema),
  AuthControllers.loginUser, 
);

export const AuthRoutes = router;