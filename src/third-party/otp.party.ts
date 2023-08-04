import speakeasy from 'speakeasy';
import { generateToken } from '../utilities';
import { Schema } from 'mongoose';

export const generateOTPSecret = (payload: { sub: Schema.Types.ObjectId; username: string }) => {
  const otpSecret = generateToken(payload, 'custom');
  return otpSecret;
};

export const generateOTP = (otpSecret: string) => {
  const otp = speakeasy.totp({
    secret: otpSecret,
    algorithm: 'sha256',
    encoding: 'base32',
    step: 30,
  });
  return otp;
};

export const verifyOTP = (otp: string, otpSecret: string) => {
  const resultVerify = speakeasy.totp.verify({
    secret: otpSecret,
    algorithm: 'sha256',
    encoding: 'base32',
    token: otp,
    step: 30,
    window: 2,
  });
  return resultVerify;
};
