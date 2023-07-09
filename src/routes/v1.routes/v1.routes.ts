import express from 'express';
import testRouter from './test.routes';

const v1Router = express.Router();

v1Router.use('/test', testRouter);

export default v1Router;
