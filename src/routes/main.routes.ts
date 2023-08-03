import { Application } from 'express';
import v1Router from './v1.routes/v1.routes';
import { AuthController } from '../controllers';
import { createResponse } from '../utilities';
import createHttpError from 'http-errors';

const mainRouter = (app: Application) => {
  app.use('/api/v1', v1Router);

  app.get('/verify-account/:token', AuthController.handleVerifyAccount);
};

export default mainRouter;
