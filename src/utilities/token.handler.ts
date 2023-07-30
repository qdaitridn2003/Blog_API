import jwt from 'jsonwebtoken';
import { ServerConfig } from '../config';

type SignatureType = 'access' | 'refresh';

const accessTokenKey = ServerConfig.accessTokenKey;
const refreshTokenKey = ServerConfig.refreshTokenKey;

const generateToken = (payload: object | string | Buffer, signature: SignatureType) => {
  if (signature === 'access') {
    return jwt.sign(payload, accessTokenKey ?? '', { algorithm: 'HS256', expiresIn: '30s' });
  } else if (signature === 'refresh') {
    return jwt.sign(payload, refreshTokenKey ?? '', { algorithm: 'HS256', expiresIn: '30d' });
  } else {
    throw new Error('Invalid signature');
  }
};

const verifyToken = (token: string, signature: SignatureType) => {
  if (signature === 'access') {
    return jwt.verify(token, accessTokenKey ?? '');
  } else if (signature === 'refresh') {
    return jwt.verify(token, refreshTokenKey ?? '');
  } else {
    throw new Error('Invalid signature');
  }
};

const decodeToken = (token: string) => jwt.decode(token);

export { generateToken, verifyToken, decodeToken };
