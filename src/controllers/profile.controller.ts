import { NextFunction, Request, Response } from 'express';
import { ProfileModel } from '../models';
import { createResponse, defaultAvatarUrl, uploadAvatarImage } from '../utilities';
import { ProfileValidate } from '../validates';

class ProfileController {
  async handleRegisterProfile(req: Request, res: Response, next: NextFunction) {
    const avatar = req.file;
    console.log(avatar);
    const { firstName, lastName, subName, dob, gender, bio, auth_id } = req.body;
    const resultValidate = ProfileValidate.safeParse({ dateOfBirth: new Date(dob), ...req.body });
    if (resultValidate.success) {
      try {
        if (avatar) {
          const avatarHandled = await uploadAvatarImage(avatar);
          const result = await ProfileModel.create({ avatar: avatarHandled, ...req.body });
          next(createResponse({ data: result }));
        } else {
          const result = await ProfileModel.create({ auth_id, avatar: defaultAvatarUrl, ...req.body });
          next(createResponse({ data: result }));
        }
      } catch (error) {
        next(error);
      }
    } else next(resultValidate.error);
  }

  /* Get Me Profile [GET] */
  async handleGetMe(req: Request, res: Response, next: NextFunction) {
    const { _id } = res.locals;
    try {
      const resultFind = await ProfileModel.findOne({ auth_id: _id });
      next(createResponse({ profile: resultFind }));
    } catch (error) {
      next(error);
    }
  }

  /* Get Anyone Profile [GET] */
  async handleGetUserProfile(req: Request, res: Response, next: NextFunction) {
    const { _id } = req.params;
    try {
      const resultFind = await ProfileModel.findOne({ _id });
      next(createResponse({ profile: resultFind }));
    } catch (error) {
      next(error);
    }
  }

  /* Edit Info Profile [PATCH] */
  async handleEditInfoProfile(req: Request, res: Response, next: NextFunction) {
    const { _id } = res.locals;
    const avatar = req.file;
    const { firstName, lastName, subName, dob, gender, bio } = req.body;
    const resultValidate = ProfileValidate.safeParse({ dateOfBirth: new Date(dob), ...req.body });
    if (resultValidate.success) {
      try {
        if (avatar) {
          const avatarHandled = await uploadAvatarImage(avatar);
          const result = await ProfileModel.findOneAndUpdate(
            { auth_id: _id },
            { avatar: avatarHandled, dob: new Date(dob), firstName, lastName, subName, gender, bio },
          );
          next(createResponse({ profile: result }, 'Update profile successfully'));
        } else {
          const result = await ProfileModel.findOneAndUpdate(
            { auth_id: _id },
            { avatar: defaultAvatarUrl, dob: new Date(dob), firstName, lastName, subName, gender, bio },
          );
          console.log(result);
          next(createResponse({ profile: result }, 'Update profile successfully'));
        }
      } catch (error) {
        next(error);
      }
    } else next(resultValidate.error);
  }
}

export default new ProfileController();
