import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({ path: './.env' });

type SignatureType = 'access' | 'refresh';

const generateToken = (payload: object | string | Buffer, signature: SignatureType) => {
  if (signature === 'access') {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY ?? '', { algorithm: 'HS256', expiresIn: '30s' });
  } else if (signature === 'refresh') {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY ?? '', { algorithm: 'HS256', expiresIn: '30d' });
  } else {
    throw new Error('Invalid signature');
  }
};

const verifyToken = (token: string, signature: SignatureType) => {
  if (signature === 'access') {
    return jwt.verify(token, process.env.ACCESS_TOKEN_KEY ?? '');
  } else if (signature === 'refresh') {
    return jwt.verify(token, process.env.REFRESH_TOKEN_KEY ?? '');
  } else {
    throw new Error('Invalid signature');
  }
};

const decodeToken = (token: string) => jwt.decode(token);

export { generateToken, verifyToken, decodeToken };
