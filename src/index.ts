import express from 'express';
import 'express-error-handler';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import { mainRouter } from './routes';
import { responseHandler } from './middlewares';
import { ServerConfig } from './config';
import { startMongodbConnection } from './third-party';
import path from 'path';

const APP = express();
const PORT = ServerConfig.port;
const SERVER = http.createServer(APP);

/* Using Middlewares */
APP.use(cors());
APP.use(
  compression({
    level: 6,
    threshold: 10000,
  }),
);
APP.use(helmet({ contentSecurityPolicy: false }));
APP.use(bodyParser.urlencoded({ extended: true }));
APP.use(bodyParser.json());
APP.use(express.static(path.resolve('./src/public')));

/* Endpoint */
mainRouter(APP);

/* Third Party Connection */
startMongodbConnection();

/* Payload Handler Middleware */
APP.use(responseHandler);

SERVER.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
