// src/modules/auth/auth.route.ts
import express from 'express';
import { UserControllers } from '../user/user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createUserValidationSchema } from '../user/user.validation';
import { AuthControllers } from './auth.controller'; // <-- IMPORT THIS
import { loginValidationSchema } from './auth.validation'; // <-- IMPORT THIS

const router = express.Router();

// Registration route
router.post(
  '/register',
  validateRequest(createUserValidationSchema),
  UserControllers.createUser,
);

// Login route
router.post(
  '/login',
  validateRequest(loginValidationSchema), // 1. Validate the request
  AuthControllers.loginUser, // 2. If valid, call the login controller
);

export const AuthRoutes = router;