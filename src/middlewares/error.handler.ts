import { Request, Response, NextFunction } from 'express';
import { ErrorType } from '../types';
import { ZodError } from 'zod';
import { JsonWebTokenError } from 'jsonwebtoken';

const errorHandler = (error: ErrorType, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    const errors = error.errors;
    console.log(errors);
    if (errors.length > 1) {
      const errorsMessage = errors.map((err) => err.message);
      return res.status(401).json({ error: { message: errorsMessage }, data: {} });
    } else {
      return res.status(401).json({ error: { message: errors[0].message }, data: {} });
    }
  } else if (error instanceof JsonWebTokenError) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: { message: 'Sign in period has expired' }, data: {} });
    } else {
      return res.status(500).json({ error: { message: 'Invalid Token' }, data: {} });
    }
  } else {
    return res
      .status(error.status ?? 500)
      .json({ error: { message: error.message ?? 'Something went wrong' }, data: {} });
  }
};

export default errorHandler;
