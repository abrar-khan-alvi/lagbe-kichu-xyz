import express from 'express';
import auth from '../../middlewares/auth.middleware';
import { OrderControllers } from './order.controller';

const router = express.Router();

router.post('/', auth('buyer'), OrderControllers.createOrder);

export const OrderRoutes = router;