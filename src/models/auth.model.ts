import mongoose, { Schema } from 'mongoose';
import { IAuth } from '../types';

const authSchema = new Schema<IAuth>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    username: { type: Schema.Types.String, unique: true },
    password: { type: Schema.Types.String },
    verifiedAt: { type: Schema.Types.Date, default: null },
  },
  {
    timestamps: true,
  },
);

const authModel = mongoose.model('Auth', authSchema);

export default authModel;
