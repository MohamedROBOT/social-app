import { Types } from "mongoose";
import { SYS_CHAT_TYPE } from "../enums";

export interface IChat {
  participants: Types.ObjectId[];
  chatType: SYS_CHAT_TYPE;
  groupId: string;
  admin?: Types.ObjectId[];
  groupImage?: string;
  groupName?: string;
  groupDescription?: string;
}
