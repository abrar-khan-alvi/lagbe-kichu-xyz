import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';


import { AuthRoutes } from './modules/auth/auth.route';
import { UserRoutes } from './modules/user/user.route';
import { ProductRoutes } from './modules/product/product.route';
import { OrderRoutes } from './modules/order/order.route';

const app: Application = express();

app.use(express.json());
app.use(cors());


app.use('/api/auth', AuthRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/users', UserRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('E-commerce server is running!');
});



app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'API Not Found!',
    error: {
      path: req.originalUrl,
      message: 'The requested path is not available on the server.',
    },
  });
});

export default app;