import express from 'express';
import { ProfileController } from '../../controllers';
import { imageHandler, loginAuthorize } from '../../middlewares';

const profileRouter = express.Router();

profileRouter.post('/register', imageHandler.single('avatar'), ProfileController.handleRegisterProfile);
profileRouter.patch('/edit/:_id', imageHandler.single('avatar'), ProfileController.handleEditInfoProfile);

profileRouter.use(loginAuthorize);

profileRouter.get('/me', ProfileController.handleGetMe);
profileRouter.get('/:_id', ProfileController.handleGetUserProfile);

export default profileRouter;
