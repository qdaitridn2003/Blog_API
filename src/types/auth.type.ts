import { Schema } from 'mongoose';

export interface IAuth {
  _id?: Schema.Types.ObjectId;
  username?: string;
  password?: string;
  verifiedAt?: Date;
}
