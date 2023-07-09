import express from 'express';
import { TestController } from '../../controllers';
import { loginAuthorize } from '../../middlewares';

const testRouter = express.Router();

testRouter.route('/').get(loginAuthorize, TestController.testHandler).post(TestController.demoHandler);

export default testRouter;
