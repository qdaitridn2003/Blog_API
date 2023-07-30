import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const mongodbConfig = {
  username: process.env.MONGODB_USERNAME,
  password: process.env.MONGODB_PASSWORD,
  endpoint: process.env.MONGODB_ENDPOINT,
};

export default mongodbConfig;
