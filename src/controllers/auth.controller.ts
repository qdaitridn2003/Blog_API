import { NextFunction, Request, Response } from 'express';
import {
  ChangePasswordValidate,
  EmailValidate,
  LoginValidate,
  RegisterValidate,
  ResetPasswordValidate,
} from '../validates';
import { AuthModel, ProfileModel } from '../models';
import {
  generateOTP,
  generateOTPSecret,
  sendMailToVerifyAccountHandler,
  sendOtpToEmailHandler,
  verifyOTP,
} from '../third-party';
import {
  compareHashPassword,
  createResponse,
  decodeToken,
  generateHashPassword,
  generateToken,
  verifyToken,
} from '../utilities';
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
          if (result) {
            const otpSecret = generateOTPSecret({ sub: result._id, username: result.username });
            const otp = generateOTP(otpSecret);
            console.log('Confirm email address otp:', otp);
            sendMailToVerifyAccountHandler(result.username, otp);
            next(createResponse({ otpSecret }, 'Please check your email to confirm account'));
          }
        } catch (error) {
          next(error);
        }
      }
    } else next(resultValidate.error);
  }

  /* Handle Verify Email Address [PATCH] */
  async handleVerifyAccount(req: Request, res: Response, next: NextFunction) {
    const { otpSecret, otp } = req.body;
    try {
      const decodeToken = verifyToken(otpSecret, 'custom');
      const isInvalidOTP = verifyOTP(otp, otpSecret);
      if (isInvalidOTP) {
        try {
          const result = await AuthModel.findOneAndUpdate({ _id: decodeToken.sub }, { verifiedAt: new Date() });
          next(createResponse({ _id: result?._id }, 'Confirm email address successfully'));
        } catch (error) {
          next(error);
        }
      } else {
        next(createHttpError(401, 'Otp is expired'));
      }
    } catch (error) {
      next(error);
    }
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
    const resultValidate = EmailValidate.safeParse({ username });
    if (resultValidate.success) {
      try {
        const resultFind = await AuthModel.findOne({ username });
        if (resultFind) {
          const otpSecret = generateOTPSecret({ sub: resultFind._id, username: resultFind.username });
          const otp = generateOTP(otpSecret);
          console.log('Confirm reset password otp:', otp);
          sendOtpToEmailHandler(username, otp);
          next(createResponse({ otpSecret }, 'Please check your email to get otp'));
        } else {
          next(createHttpError(401, 'Your account is not exist'));
        }
      } catch (error) {
        next(error);
      }
    } else next(resultValidate.error);
  }

  /* Handle Verify Otp To Forgot Password */
  async handleVerifyOtpToForgotPassword(req: Request, res: Response, next: NextFunction) {
    const { otpSecret, otp } = req.body;
    try {
      const decodeToken = verifyToken(otpSecret, 'custom');
      const isInvalidOTP = verifyOTP(otp, otpSecret);
      if (isInvalidOTP) {
        try {
          const result = await AuthModel.findOne({ _id: decodeToken.sub });
          next(createResponse({ account: result }, 'Verify otp successfully'));
        } catch (error) {
          next(error);
        }
      } else {
        next(createHttpError(401, 'Otp is expired'));
      }
    } catch (error) {
      next(error);
    }
  }

  /* Handle Forgot Password [PATCH] */
  async handleForgotPassword(req: Request, res: Response, next: NextFunction) {
    const { newPassword, confirmPassword, _id } = req.body;
    const resultValidate = ResetPasswordValidate.safeParse({ newPassword, confirmPassword });
    if (resultValidate.success) {
      try {
        const hashPassword = generateHashPassword(newPassword);
        const result = await AuthModel.updateOne({ _id: _id }, { password: hashPassword });
        next(createResponse({}, 'Your account has been reset password'));
      } catch (error) {
        next(error);
      }
    } else next(resultValidate.error);
  }

  /* Handle Check Token And Generate New Token [POST] */
  async handleGetNewAccessToken(req: Request, res: Response, next: NextFunction) {
    const { accessToken, refreshToken } = req.body;
    try {
      const isExpired = verifyToken(accessToken, 'access');
    } catch (error) {
      if (error) {
        const resultDecode = decodeToken(refreshToken);
        try {
          const resultFind = await AuthModel.findById(resultDecode?.sub);
          const accessToken = generateToken({ sub: resultFind?._id, username: resultFind?.username }, 'access');
          next(createResponse({ accessToken }));
        } catch (error) {
          next(error);
        }
      }
    }
  }

  /* Handle Delete Account [DELETE] */
  async handleDeleteAccount(req: Request, res: Response, next: NextFunction) {
    const { _id } = res.locals;
    try {
      const resultAuth = await AuthModel.deleteOne({ _id: _id });
      const resultProfile = await ProfileModel.deleteOne({ auth_id: _id });
      next(createResponse({}, 'Deleted account successfully'));
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
