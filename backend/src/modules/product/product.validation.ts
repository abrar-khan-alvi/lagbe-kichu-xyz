import { z } from 'zod';

export const createProductValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    price: z.number().positive({ message: 'Price must be a positive number' }),
    category: z.string().min(1, { message: 'Category is required' }),
  }),
});