import mongoose, { Schema, Document } from "mongoose";

interface IPost extends Document {
  readonly title: string;
  readonly description: string;
  readonly createdAt: Date;
  updatedAt: Date;
}

const postSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

postSchema.pre<IPost>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Post = mongoose.model<IPost>("Post", postSchema);

export default Post;
