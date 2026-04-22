import { model, Schema, Types } from "mongoose";
import { IPost } from "../../../common";
//first we create the interface of the model and use it here!

const schema = new Schema<IPost>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: String,
    attachments: [String],
    reactionCount: {
      type: Number,
      default: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    shareCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);
export const Post = model("Post", schema);
