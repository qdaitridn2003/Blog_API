import express from 'express';
import { AuthController } from '../../controllers';

const authRouter = express.Router();

authRouter.post('/register', AuthController.handleRegister);

authRouter.get('/verify/:_id', AuthController.handleVerifyAccount);

export default authRouter;
