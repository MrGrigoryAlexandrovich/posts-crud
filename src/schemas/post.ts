import mongoose, { Schema, Document } from "mongoose";
import { toJSONSchema } from "mongoose-schema-jsonschema";

toJSONSchema(mongoose);

export interface IPost extends Document {
  readonly title: string;
  readonly description: string;
  readonly createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
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

postSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const PostModel = mongoose.model<IPost>("Post", postSchema);

export const postJSONSchema = (postSchema as any).jsonSchema();
