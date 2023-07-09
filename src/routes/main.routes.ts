import { Application } from 'express';
import v1Router from './v1.routes/v1.routes';

const mainRouter = (app: Application) => {
  app.use('/api/v1', v1Router);
};

export default mainRouter;
