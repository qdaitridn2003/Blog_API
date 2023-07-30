import dotenv from 'dotenv';

dotenv.config({ path: './src/.env' });

const serverConfig = {
  port: process.env.PORT,
  accessTokenKey: process.env.ACCESS_TOKEN_KEY,
  refreshTokenKey: process.env.ACCESS_TOKEN_KEY,
};

export default serverConfig;
