import express from 'express';
import { ProfileController } from '../../controllers';
import { imageHandler, loginAuthorize } from '../../middlewares';

const profileRouter = express.Router();

profileRouter.post('/register', imageHandler.single('avatar'), ProfileController.handleRegisterProfile);

profileRouter.use(loginAuthorize);

profileRouter.get('/me', ProfileController.handleGetMe);
profileRouter.patch('/edit/info', ProfileController.handleEditInfoProfile);
profileRouter.patch('/edit/avatar', imageHandler.single('avatar'), ProfileController.handleEditAvatarProfile);
profileRouter.get('/:_id', ProfileController.handleGetUserProfile);

export default profileRouter;
