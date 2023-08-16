import { NextFunction, Request, Response } from 'express';
import { PayloadType } from '../types';

const responseHandler = (payload: PayloadType, req: Request, res: Response, next: NextFunction) => {
  if (payload instanceof Error) {
    next(payload);
  } else {
    return res
      .status(payload.status ?? 200)
      .json({ data: payload.data, message: payload.message ?? 'Successfully', error: null });
  }
};

export default responseHandler;
