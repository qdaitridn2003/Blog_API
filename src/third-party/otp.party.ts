import speakeasy from 'speakeasy';
import { ServerConfig } from '../config';

const otpSecret = ServerConfig.otpSecret as string;

export const generateOTP = () => {
  const otp = speakeasy.totp({
    secret: otpSecret,
    algorithm: 'sha256',
    encoding: 'base32',
    step: 30,
  });
  return otp;
};

export const verifyOTP = (otp: string) => {
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
