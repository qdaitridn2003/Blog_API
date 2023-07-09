import express from 'express';
import 'express-error-handler';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { mainRouter } from './routes';
import { responseHandler } from './middlewares';

dotenv.config({ path: './.env' });

const APP = express();
const PORT = process.env.PORT;
const SERVER = http.createServer(APP);

/* Using Middlewares */
APP.use(cors());
APP.use(
  compression({
    level: 6,
    threshold: 10000,
  }),
);
APP.use(helmet());
APP.use(bodyParser.urlencoded({ extended: false }));
APP.use(bodyParser.json());

/* Endpoint */
mainRouter(APP);

/* Payload Handler Middleware */
APP.use(responseHandler);

SERVER.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
