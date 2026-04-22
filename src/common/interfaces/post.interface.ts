import { Types } from "mongoose";
//the interface that is used for the post model
export interface IPost {
  userId: Types.ObjectId;
  content?: string;
  attachments?: string[]; // Array of attachment URLs
  reactionCount: number; //calculated field from user reaction length
  commentCount: number; //calculated field from comment length
  shareCount: number; //calculated field from share length
}
