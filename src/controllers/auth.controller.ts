import { NextFunction, Request, Response } from 'express';
import {
  ChangePasswordValidate,
  EmailValidate,
  LoginValidate,
  RegisterValidate,
  ResetPasswordValidate,
} from '../validate';
import { AuthModel } from '../models';
import { generateOTP, sendMailToVerifyAccountHandler, sendOtpToEmailHandler, verifyOTP } from '../third-party';
import { compareHashPassword, createResponse, generateHashPassword, generateToken, verifyToken } from '../utilities';
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
          const verifyToken = generateToken({ sub: result._id, username: result.username }, 'custom');
          sendMailToVerifyAccountHandler(username, verifyToken);
          next(createResponse({}, 'Please check your email to confirm account'));
        } catch (error) {
          next(error);
        }
      }
    } else next(resultValidate.error);
  }

  /* Handle Verify Email Address [GET] */
  async handleVerifyAccount(req: Request, res: Response, next: NextFunction) {
    const { token } = req.params;
    try {
      const decodeToken = verifyToken(token, 'custom');
      try {
        const result = await AuthModel.updateOne({ _id: decodeToken.sub }, { verifiedAt: new Date() });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }

    res.sendFile(path.resolve('./src/pages/verifyPage.html'));
  }

  /* Handle Change Password [PATCH] */
  async handleChangePassword(req: Request, res: Response, next: NextFunction) {
    const { _id } = res.locals;
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const resultValidate = ChangePasswordValidate.safeParse({ oldPassword, newPassword, confirmPassword });
    if (resultValidate.success) {
      try {
        const resultCheckPassword = await AuthModel.findById(_id);
        if (resultCheckPassword) {
          const checkPassword = compareHashPassword(oldPassword, resultCheckPassword.password);
          if (!checkPassword) {
            next(createHttpError(401, 'Old password is not correct'));
          } else {
            const hashPassword = generateHashPassword(newPassword);
            try {
              const result = await AuthModel.updateOne({ _id }, { password: hashPassword });
              if (result) next(createResponse({}, 'Successfully change password'));
            } catch (error) {
              next(error);
            }
          }
        }
      } catch (error) {
        next(error);
      }
    } else next(resultValidate.error);
  }

  /* Handle Get Email To Forgot Password [POST] */
  async handleGetEmailToForgotPassword(req: Request, res: Response, next: NextFunction) {
    const { username } = req.body;
    res.locals.username = username;
    const resultValidate = EmailValidate.safeParse({ username });
    if (resultValidate.success) {
      try {
        const resultFind = await AuthModel.findOne({ username });
        if (resultFind) {
          const otp = generateOTP();
          sendOtpToEmailHandler(username, otp);
          next(createResponse({}, 'Please check your email to get otp'));
        } else {
          next(createHttpError(401, 'Your account is not exist'));
        }
      } catch (error) {
        next(error);
      }
    } else next(resultValidate.error);
  }

  /* Handle Forgot Password [PATCH] */
  async handleForgotPassword(req: Request, res: Response, next: NextFunction) {
    const { otp, newPassword, confirmPassword, username } = req.body;
    const resultValidate = ResetPasswordValidate.safeParse({ otp, newPassword, confirmPassword, username });
    if (resultValidate.success) {
      const isInvalidOTP = verifyOTP(otp);
      if (isInvalidOTP) {
        try {
          const hashPassword = generateHashPassword(newPassword);
          const result = await AuthModel.updateOne({ username }, { password: hashPassword });
          next(createResponse({}, 'Your account has been reset password'));
        } catch (error) {
          next(error);
        }
      } else {
        next(createHttpError(401, 'OTP is expired'));
      }
    } else next(resultValidate.error);
  }
}

export default new AuthController();
