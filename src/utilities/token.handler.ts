import jwt from 'jsonwebtoken';
import { ServerConfig } from '../config';

type SignatureType = 'access' | 'refresh' | 'custom';

const accessTokenKey = ServerConfig.accessTokenKey as string;
const refreshTokenKey = ServerConfig.refreshTokenKey as string;
const customTokenKey = ServerConfig.customTokenKey as string;

const generateToken = (payload: object | string | Buffer, signature: SignatureType) => {
  if (signature === 'access') {
    return jwt.sign(payload, accessTokenKey, { algorithm: 'HS256', expiresIn: '30s' });
  } else if (signature === 'refresh') {
    return jwt.sign(payload, refreshTokenKey, { algorithm: 'HS256', expiresIn: '30d' });
  } else if (signature === 'custom') {
    return jwt.sign(payload, customTokenKey, { algorithm: 'HS256', expiresIn: '5m' });
  } else {
    throw new Error('Invalid signature');
  }
};

const verifyToken = (token: string, signature: SignatureType) => {
  if (signature === 'access') {
    return jwt.verify(token, accessTokenKey);
  } else if (signature === 'refresh') {
    return jwt.verify(token, refreshTokenKey);
  } else if (signature === 'custom') {
    return jwt.verify(token, customTokenKey);
  } else {
    throw new Error('Invalid signature');
  }
};

const decodeToken = (token: string) => jwt.decode(token);

export { generateToken, verifyToken, decodeToken };
