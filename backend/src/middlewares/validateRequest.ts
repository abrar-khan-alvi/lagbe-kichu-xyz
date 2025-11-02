// src/middlewares/validateRequest.ts
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the request body against the provided schema
      await schema.parseAsync({
        body: req.body,
      });
      next(); // If validation is successful, proceed to the next middleware/controller
    } catch (error) {
      // If validation fails, send back a 400 error with the issues
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: error,
      });
    }
  };
};

export default validateRequest;