// src/modules/order/order.interface.ts
import { Types } from 'mongoose';

interface OrderProduct {
  productId: Types.ObjectId;
  quantity: number;
  price: number; // Price at the time of purchase
}

export type TOrder = {
  buyerId: Types.ObjectId;
  products: OrderProduct[];
  totalPrice: number;
  status: 'Pending Approval' | 'Processing' | 'Out for Delivery' | 'Completed' | 'Cancelled/Rejected';
  shippingAddress: string;
};