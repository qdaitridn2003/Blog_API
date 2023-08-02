import { Schema } from 'mongoose';

export interface IProfile {
  _id: Schema.Types.ObjectId;
  firstName: string;
  subName?: string;
  lastName: string;
  gender: string;
  dob: Date;
  bio?: string;
  avatar?: string;
  auth_id: Schema.Types.ObjectId;
}
