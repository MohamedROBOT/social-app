import { CommentRepository } from "../../DB/models";
import { container } from "./container";
import { TOKENS } from "./tokens";

export const commentRepository = container.resolve<CommentRepository>(
 TOKENS.CommentRepository
);
