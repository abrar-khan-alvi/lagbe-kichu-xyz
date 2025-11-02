
import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (buyerId: string, payload: { products: { productId: string, quantity: number }[], shippingAddress: string }) => {

  const productIds = payload.products.map(p => p.productId);
  const productsFromDB = await Product.find({ _id: { $in: productIds } });

  let totalPrice = 0;
  const orderProducts = payload.products.map(p => {
    const productDetail = productsFromDB.find(dbP => dbP._id.toString() === p.productId);
    if (!productDetail) {
      throw new Error(`Product with ID ${p.productId} not found.`);
    }
    totalPrice += productDetail.price * p.quantity;
    return {
      productId: productDetail._id,
      quantity: p.quantity,
      price: productDetail.price, 
    };
  });

  const orderData: TOrder = {
    buyerId: new (require('mongoose').Types.ObjectId)(buyerId),
    products: orderProducts,
    totalPrice,
    shippingAddress: payload.shippingAddress,
    status: 'Pending Approval',
  };

  const result = await Order.create(orderData);
  return result;
};

export const OrderServices = { createOrderIntoDB };