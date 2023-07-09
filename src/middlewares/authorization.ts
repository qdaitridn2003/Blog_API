import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utilities';

const loginAuthorize = (req: Request, res: Response, next: NextFunction) => {
  const token = req.get('authorization');
  let accessToken: string;
  if (token?.includes('Bearer')) [, accessToken] = token.split(' ');
  else accessToken = token ?? '';
  try {
    const decode = verifyToken(accessToken, 'access');
    if (decode) next();
  } catch (error) {
    next(error);
  }
};

const adminAuthorize = () => {};

export { loginAuthorize, adminAuthorize };
