import mongoose, { Schema } from 'mongoose';

const blogSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    profile_id: { type: Schema.Types.ObjectId, ref: 'Profile' },
    content: { type: Schema.Types.String },
    thumbnail: { type: Schema.Types.String },
    isDelete: { type: Schema.Types.Boolean, default: false },
    deletedAt: { type: Schema.Types.Date, default: null },
  },
  { timestamps: true },
);

const blogModel = mongoose.model('Blog', blogSchema);

export default blogModel;
