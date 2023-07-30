import { NextFunction, Request, Response } from 'express';
import { AuthModel } from '../models';

class AuthController {
  async handleLogin(req: Request, res: Response, next: NextFunction) {}
  async handleRegister(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    try {
      const result = await AuthModel.create({ username: username, password: password });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async handleVerifyAccount(req: Request, res: Response, next: NextFunction) {}
}

export default new AuthController();
