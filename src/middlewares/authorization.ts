import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { verifyToken } from '../utilities';

const loginAuthorize = (req: Request, res: Response, next: NextFunction) => {
  const token = req.get('authorization');
  if (token) {
    let accessToken: string;
    if (token?.includes('Bearer')) {
      [, accessToken] = token.split(' ');
      try {
        const result = verifyToken(accessToken, 'access');
        res.locals._id = result.sub;
        next();
      } catch (error) {
        next(error);
      }
    }
  } else {
    next(createHttpError(401, 'Missing access token'));
  }
};

const adminAuthorize = () => {};

export { loginAuthorize, adminAuthorize };
