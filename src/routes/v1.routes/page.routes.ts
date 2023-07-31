import express, { Request, Response } from 'express';
import path from 'path';

const pageRouter = express.Router();

pageRouter.get('/verify-account/:_id', (req: Request, res: Response) => {
  const { _id } = req.params;
  res.sendFile(path.resolve('./src/pages/verifyPage.html'));
});

export default pageRouter;
