import { HttpError } from 'http-errors';

type PayloadType = { status?: number; message?: string; data: any } | HttpError;

export default PayloadType;
