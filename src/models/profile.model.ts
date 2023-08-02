import mongoose, { Schema } from 'mongoose';
import { IProfile } from '../types';

const profileSchema = new Schema<IProfile>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  firstName: { type: Schema.Types.String, required: true },
  subName: { type: Schema.Types.String },
  lastName: { type: Schema.Types.String, required: true },
  gender: { type: Schema.Types.String, required: true },
  avatar: { type: Schema.Types.String },
  bio: { type: Schema.Types.String },
  dob: { type: Schema.Types.Date, required: true },
  auth_id: { type: Schema.Types.ObjectId, ref: 'Auth' },
});

const profileModel = mongoose.model('Profile', profileSchema);

export default profileModel;
