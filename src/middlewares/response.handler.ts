import { NextFunction, Request, Response } from 'express';
import { PayloadType } from '../types';

const responseHandler = (payload: PayloadType, req: Request, res: Response, next: NextFunction) => {
  if (payload instanceof Error) {
    switch (payload.name) {
      case 'TokenExpiredError':
        return res.status(401).json({ error: { name: payload.name, message: 'Token has expired' } });
      default:
        return res.status(payload.status ?? 500).json({ error: { name: payload.name, message: payload.message } });
    }
  } else {
    return res.status(payload.status ?? 200).json({ data: payload.data, message: payload.message ?? 'Successfully' });
  }
};

export default responseHandler;
