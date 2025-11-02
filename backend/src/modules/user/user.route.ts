// src/modules/user/user.route.ts
import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth.middleware';

const router = express.Router();

router.get('/', auth('admin'), UserControllers.getAllUsers);
router.patch('/:userId/status', auth('admin'), UserControllers.updateUserStatus);

export const UserRoutes = router;