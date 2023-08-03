import dotenv from 'dotenv';

dotenv.config({ path: './src/.env' });

const serverConfig = {
  port: process.env.PORT,
  accessTokenKey: process.env.ACCESS_TOKEN_KEY,
  refreshTokenKey: process.env.REFRESH_TOKEN_KEY,
  customTokenKey: process.env.CUSTOM_TOKEN_KEY,
  otpSecret: process.env.OTP_SECRET,
};

export default serverConfig;
