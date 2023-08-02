import ErrorType from './error.type';

type PayloadType = { status?: number; message?: string; data?: any } | ErrorType;

export default PayloadType;
