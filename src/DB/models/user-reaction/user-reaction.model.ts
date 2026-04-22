import { model, Schema } from "mongoose";
import { IUserReaction, ON_MODEL, SYS_REACTION } from "../../../common";
const schema = new Schema<IUserReaction>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    refId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "onModel", //dynamic ref must be in the model schema the same name
    },
    onModel: {
      type: String,
      required: true,
      enum: ON_MODEL,
    },
    reaction: {
      type: Number,
      enum: SYS_REACTION,
      default: SYS_REACTION.like, //0
    },
  },
  { timestamps: true },
);
export const UserReaction = model("UserReaction", schema);
