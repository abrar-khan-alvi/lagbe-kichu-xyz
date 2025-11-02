import express from 'express';
import { ProductControllers } from './product.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createProductValidationSchema } from './product.validation';
import auth from '../../middlewares/auth.middleware';

const router = express.Router();


router.post(
  '/',
  auth('seller'), 
  validateRequest(createProductValidationSchema), 
  ProductControllers.createProduct, 
);
router.get('/:productId', ProductControllers.getSingleProduct);


router.patch(
  '/:productId',
  auth('seller'),
  ProductControllers.updateProduct,
);


router.delete(
  '/:productId',
  auth('seller'),
  ProductControllers.deleteProduct,
);


router.get('/', ProductControllers.getAllProducts);

export const ProductRoutes = router;