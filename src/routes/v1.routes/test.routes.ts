import express from 'express';
import { TestController } from '../../controllers';

const testRouter = express.Router();

testRouter.post('/sendmail', TestController.handleSendMail);

export default testRouter;
