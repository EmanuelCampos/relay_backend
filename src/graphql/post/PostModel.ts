import mongoose, { Document, Model, Types } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    likesCount: {
      type: Number,
    },
    hasLiked: {
      type: [ObjectId],
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    collection: "Post",
  }
);

export interface IPost extends Document {
  title: string;
  body: string;
  likesCount: number;
  createdAt: Date;
  updatedAt: Date;
  hasLiked: [ObjectId];
}

const PostModel: Model<IPost> = mongoose.model("Post", PostSchema);

export default PostModel;
