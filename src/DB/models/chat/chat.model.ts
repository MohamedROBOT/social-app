import { model, Schema } from "mongoose";
import { IChat } from "../../../common/interfaces/chat.interface";
import { SYS_CHAT_TYPE } from "../../../common";
const schema = new Schema<IChat>(
  {
    participants: { type: [Schema.Types.ObjectId], ref: "User" },
    chatType: {
      type: Number,
      enum: SYS_CHAT_TYPE,

      default: SYS_CHAT_TYPE.private,
    },
    admin: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: function (this) {
        return this.chatType === SYS_CHAT_TYPE.group;
      },
    },
    groupImage: {type:String},
    groupName: {type:String},
    groupDescription: {type:String}
  },
  { timestamps: true },
);
export const Chat = model("Chat", schema);
