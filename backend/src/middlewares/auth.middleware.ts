// src/middlewares/auth.middleware.ts
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../modules/user/user.model';

// Extend the Express Request type to include our user payload
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const auth = (...requiredRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Get token from header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'No token provided' });
      }
      const token = authHeader.split(' ')[1];

      // 2. Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as JwtPayload;

      const { userId, role } = decoded;

      // 3. Check if user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      
      // 4. Check if the user's role is authorized
      if (requiredRoles.length && !requiredRoles.includes(role)) {
         return res.status(403).json({ success: false, message: 'You are not authorized!' });
      }

      // 5. Attach user to request object
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ success: false, message: 'Unauthorized access' });
    }
  };
};

export default auth;