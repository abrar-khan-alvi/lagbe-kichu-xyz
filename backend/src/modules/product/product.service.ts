// src/modules/product/product.service.ts
import { TProduct } from '../product.interface';
import { Product } from './product.model';

// Service to create a new product
const createProductIntoDB = async (
  sellerId: string,
  payload: Omit<TProduct, 'seller'>,
) => {
  // Combine the seller's ID with the product data
  const productData = {
    ...payload,
    seller: sellerId,
  };

  const result = await Product.create(productData);
  return result;
};

// Service to get all products (public)
const getAllProductsFromDB = async () => {
  const result = await Product.find().populate('seller', 'email'); // Populate seller info, but only the email
  return result;
};

// Service to update a product
const updateProductInDB = async (
  productId: string,
  sellerId: string,
  payload: Partial<TProduct>,
) => {
  // First, verify the product exists and belongs to the seller
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }
  // CRITICAL: Check ownership
  if (product.seller.toString() !== sellerId) {
    throw new Error('You are not authorized to update this product');
  }

  const result = await Product.findByIdAndUpdate(productId, payload, {
    new: true, // Return the updated document
  });
  return result;
};

// Service to delete a product
const deleteProductFromDB = async (productId: string, sellerId: string) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }
  // CRITICAL: Check ownership
  if (product.seller.toString() !== sellerId) {
    throw new Error('You are not authorized to delete this product');
  }

  await Product.findByIdAndDelete(productId);
  return null; // Deletion returns no content
};
// Service to get a single product by ID
const getSingleProductFromDB = async (productId: string) => {
  const result = await Product.findById(productId).populate('seller', 'email');
  if (!result) {
    throw new Error('Product not found');
  }
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  updateProductInDB,
  getSingleProductFromDB,
  deleteProductFromDB, 
};