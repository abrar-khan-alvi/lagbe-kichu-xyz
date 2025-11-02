import { Request, Response } from 'express';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const buyerId = req.user?.userId;
    const orderData = req.body;
    const result = await OrderServices.createOrderIntoDB(buyerId, orderData);
    res.status(201).json({ success: true, message: 'Order created successfully!', data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to create order', error: error.message });
  }
};
export const OrderControllers = { createOrder };