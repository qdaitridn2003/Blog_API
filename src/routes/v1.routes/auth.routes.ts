import express from 'express';
import { AuthController } from '../../controllers';

const authRouter = express.Router();

authRouter.post('/register', AuthController.handleRegister);

authRouter.post('/login', AuthController.handleLogin);

authRouter.get('/verify/:_id', AuthController.handleVerifyAccount);

export default authRouter;
