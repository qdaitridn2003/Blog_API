import { HttpError } from 'http-errors';
import { JsonWebTokenError } from 'jsonwebtoken';
import { ZodError } from 'zod';

type ErrorType = HttpError | ZodError | JsonWebTokenError;

export default ErrorType;
