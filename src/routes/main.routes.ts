import { Application } from 'express';
import v1Router from './v1.routes/v1.routes';
import pageRouter from './v1.routes/page.routes';

const mainRouter = (app: Application) => {
  app.use('/api/v1', v1Router);

  app.use('/', pageRouter);
};

export default mainRouter;
