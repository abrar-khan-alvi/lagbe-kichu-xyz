import { Request, Response } from 'express';
import { ProductServices } from './product.service';


const createProduct = async (req: Request, res: Response) => {
  try {

    const sellerId = req.user?.userId;
    const productData = req.body;

    if (!sellerId) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Seller ID not found' });
    }

    const result = await ProductServices.createProductIntoDB(sellerId, productData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: error.message,
    });
  }
};


const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDB();

    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve products',
      error: error.message,
    });
  }
};


const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const sellerId = req.user?.userId;
    const updateData = req.body;

    if (!sellerId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const result = await ProductServices.updateProductInDB(
      productId,
      sellerId,
      updateData,
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to update product', error: error.message });
  }
};


const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const sellerId = req.user?.userId;

    if (!sellerId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    await ProductServices.deleteProductFromDB(productId, sellerId);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to delete product', error: error.message });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product retrieved successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({ success: false, message: 'Product not found', error: error.message });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  updateProduct,
  getSingleProduct,
  deleteProduct, 
};