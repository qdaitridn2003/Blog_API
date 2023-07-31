import { NextFunction, Request, Response } from 'express';
import { sendMailToVerifyAccountHandler } from '../third-party';

class TestController {
  async handleSendMail(req: Request, res: Response, next: NextFunction) {
    const { mail } = req.body;
    sendMailToVerifyAccountHandler(mail);
  }
}

export default new TestController();
