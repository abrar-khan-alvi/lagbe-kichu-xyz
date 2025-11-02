import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  seller: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}, { timestamps: true });

export const Product = model<TProduct>('Product', productSchema);