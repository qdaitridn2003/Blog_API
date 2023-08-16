import express from 'express';
import authRouter from './auth.routes';
import profileRouter from './profile.routes';
import blogRouter from './blog.routes';
const v1Router = express.Router();

v1Router.use('/auth', authRouter);

v1Router.use('/profile', profileRouter);

v1Router.use('/blog', blogRouter);

export default v1Router;
