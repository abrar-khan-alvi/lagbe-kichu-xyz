import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>({
  buyerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Pending Approval', 'Processing', 'Out for Delivery', 'Completed', 'Cancelled/Rejected'],
    default: 'Pending Approval',
  },
  shippingAddress: { type: String, required: true },
}, { timestamps: true });

export const Order = model<TOrder>('Order', orderSchema);