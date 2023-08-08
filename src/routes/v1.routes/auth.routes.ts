import express from 'express';
import { AuthController } from '../../controllers';
import { loginAuthorize } from '../../middlewares';

const authRouter = express.Router();

authRouter.post('/register', AuthController.handleRegister);

authRouter.post('/login', AuthController.handleLogin);

authRouter.patch('/verify-mail', AuthController.handleVerifyAccount);

authRouter.patch('/change-password', loginAuthorize, AuthController.handleChangePassword);

authRouter
  .route('/forgot-password')
  .post(AuthController.handleGetEmailToForgotPassword)
  .patch(AuthController.handleForgotPassword);

authRouter.post('/get-access-token', AuthController.handleGetNewAccessToken);

export default authRouter;
