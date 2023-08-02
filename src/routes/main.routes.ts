import { Application } from 'express';
import v1Router from './v1.routes/v1.routes';
import { AuthController } from '../controllers';

const mainRouter = (app: Application) => {
  app.use('/api/v1', v1Router);

  app.get('/verify-account/:_id', AuthController.handleVerifyAccount);
};

export default mainRouter;
