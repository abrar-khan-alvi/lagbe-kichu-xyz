import { TProduct } from './product.interface';
import { Product } from './product.model';


const createProductIntoDB = async (
  sellerId: string,
  payload: Omit<TProduct, 'seller'>,
) => {

  const productData = {
    ...payload,
    seller: sellerId,
  };

  const result = await Product.create(productData);
  return result;
};


const getAllProductsFromDB = async () => {
  const result = await Product.find().populate('seller', 'email');
  return result;
};


const updateProductInDB = async (
  productId: string,
  sellerId: string,
  payload: Partial<TProduct>,
) => {

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  if (product.seller.toString() !== sellerId) {
    throw new Error('You are not authorized to update this product');
  }

  const result = await Product.findByIdAndUpdate(productId, payload, {
    new: true, 
  });
  return result;
};


const deleteProductFromDB = async (productId: string, sellerId: string) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  if (product.seller.toString() !== sellerId) {
    throw new Error('You are not authorized to delete this product');
  }

  await Product.findByIdAndDelete(productId);
  return null; 
};

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