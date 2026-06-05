import * as z from "zod";
import { generalFields } from "../../common";
import { error } from "node:console";
export const createPostSchema = z
  .object({
    content: z.string().optional(),
    attachments: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      const { attachments, content } = data;
      if (!content && (!attachments || attachments.length === 0)) {
        return false;
      }
      return true;
    },
    { message: "Either content or attachment is required", path: ["content, attachments"] },
  );
