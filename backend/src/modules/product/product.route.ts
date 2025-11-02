// src/modules/product/product.route.ts
import express from 'express';
import { ProductControllers } from './product.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createProductValidationSchema } from './product.validation';
import auth from '../../middlewares/auth.middleware'; // <-- The Gatekeeper

const router = express.Router();

// Route to create a new product
// ONLY users with the 'seller' role can access this
router.post(
  '/',
  auth('seller'), // <-- 1. Check for login and role
  validateRequest(createProductValidationSchema), // <-- 2. Validate data
  ProductControllers.createProduct, // <-- 3. Create product
);
router.get('/:productId', ProductControllers.getSingleProduct);

// Route to update a product by ID
router.patch(
  '/:productId',
  auth('seller'),
  ProductControllers.updateProduct,
);

// Route to delete a product by ID
router.delete(
  '/:productId',
  auth('seller'),
  ProductControllers.deleteProduct,
);

// Route to get all products (publicly accessible)
router.get('/', ProductControllers.getAllProducts);

export const ProductRoutes = router;