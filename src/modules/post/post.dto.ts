import { createContext } from "node:vm";
import z from "zod";
import { BadRequestException, SYS_REACTION } from "../../common";
import { Types } from "mongoose";

//DTO >> data transfer object
export interface CreatePostDTO {
  content?: string;
  attachments: string[];
}


export const createPostSchema = z
  .object({
    content: z.string().optional(),
    attachments: z.array(z.string()).optional(),
  })
  .refine((data, ) => {
    const { attachments, content } = data;
    if (!content && (!attachments || attachments.length === 0)) {
      throw new BadRequestException("content or attachments is required");
    }
    return true;
  });

  export interface AddReactionDTO {
    postId: Types.ObjectId;
    reaction: SYS_REACTION
}