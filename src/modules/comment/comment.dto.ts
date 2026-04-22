import { Types } from "mongoose";

export interface CreateCommentDTO {
    content?: string;
    attachments?: string[]
    mentions?: Types.ObjectId[];


    //userId => token (mandatory)
    //postId => params (mandatory)
    //parentId => params (optional)
}