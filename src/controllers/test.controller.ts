import { NextFunction, Request, Response } from 'express';
import { createResponse, generateToken, verifyToken } from '../utilities';

class TestController {
  testHandler(req: Request, res: Response, next: NextFunction) {
    next(createResponse({ name: 'Tris', age: 18 }, 201, 'Request success'));
  }
  async demoHandler(req: Request, res: Response, next: NextFunction) {
    const token = generateToken(req.body, 'access');
    next(createResponse({ accessToken: token }));
  }
}

export default new TestController();
