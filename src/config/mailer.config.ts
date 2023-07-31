import dotenv from 'dotenv';

dotenv.config({ path: './src/.env' });

const mailerConfig = {
  username: process.env.MAILER_USERNAME,
  password: process.env.MAILER_PASSWORD,
};

export default mailerConfig;
