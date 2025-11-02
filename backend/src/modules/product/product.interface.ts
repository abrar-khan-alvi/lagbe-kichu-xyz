import { Types } from 'mongoose';

export type TProduct = {
  title: string;
  description: string;
  price: number;
  category: string;
  seller: Types.ObjectId; 
};