import { NextFunction, Request, Response } from 'express';
import { AuthModel } from '../models';
import path from 'path';

class AuthController {
  async handleLogin(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    try {
      const result = await AuthModel.findOne({ username, password });
      if (!result?.verifiedAt) console.log('You have not verified your account');
    } catch (error) {
      console.log(error);
    }
  }
  async handleRegister(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    try {
      const result = await AuthModel.create({ username: username, password: password });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async handleVerifyAccount(req: Request, res: Response, next: NextFunction) {
    const { _id } = req.params;
    try {
      const result = await AuthModel.updateOne({ _id: _id }, { verifyAt: new Date() });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    res.sendFile(path.resolve('./src/pages/verifyPage.html'));
  }
}

export default new AuthController();
