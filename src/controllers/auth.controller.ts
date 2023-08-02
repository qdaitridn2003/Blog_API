import { NextFunction, Request, Response } from 'express';
import { LoginValidate, RegisterValidate } from '../validate';
import { AuthModel } from '../models';
import { sendMailToVerifyAccountHandler } from '../third-party';
import { compareHashPassword, createResponse, generateHashPassword, generateToken } from '../utilities';
import path from 'path';
import createHttpError from 'http-errors';

class AuthController {
  /* Handle Login [POST] */
  async handleLogin(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    const resultValidate = LoginValidate.safeParse({
      username: username,
      password: password,
    });
    if (resultValidate.success) {
      try {
        const result = await AuthModel.findOne({ username: username });
        if (result) {
          if (!result.verifiedAt) next(createHttpError(401, 'Your account is not verify'));
          else if (!compareHashPassword(password, result.password)) {
            next(createHttpError(401, 'Password is not correct'));
          } else {
            const accessToken = generateToken({ sub: result._id, username: result.username }, 'access');
            const refreshToken = generateToken({ sub: result._id, username: result.username }, 'refresh');
            next(createResponse({ accessToken, refreshToken }));
          }
        } else next(createHttpError(400, 'Account is not exist'));
      } catch (error) {}
    } else next(resultValidate.error);
  }

  /* Handle Register [POST] */
  async handleRegister(req: Request, res: Response, next: NextFunction) {
    const { username, password, confirmPassword } = req.body;
    const resultValidate = RegisterValidate.safeParse({
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    });
    if (resultValidate.success) {
      const resultCheckDuplicate = await AuthModel.findOne({ username });
      if (resultCheckDuplicate) {
        next(createHttpError(401, 'Username already exists'));
      } else {
        try {
          const hashPassword = generateHashPassword(password);
          const result = await AuthModel.create({ username, password: hashPassword });
          sendMailToVerifyAccountHandler(username, result._id);
          next(createResponse({}, 'Please check your email to confirm account'));
        } catch (error) {
          next(error);
        }
      }
    } else next(resultValidate.error);
  }

  /* Handle Verify Email Address [GET] */
  async handleVerifyAccount(req: Request, res: Response, next: NextFunction) {
    const { _id } = req.params;
    try {
      const result = await AuthModel.updateOne({ _id: _id }, { verifiedAt: new Date() });
    } catch (error) {
      next(error);
    }
    res.sendFile(path.resolve('./src/pages/verifyPage.html'));
  }
}

export default new AuthController();
