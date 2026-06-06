import { AuthService, ChatService, CommentService, RequestService, UserService } from "../../modules";
import { PostService } from "../../modules/post/post.service";
import { RedisCacheProvider } from "../cache/redis/redis.service";
import { container } from "./container";

import { TOKENS } from "./tokens";

export const authService = container.resolve<AuthService>(
  TOKENS.AuthService
);
export const userService = container.resolve<UserService>(
  TOKENS.UserService
);
export const chatService = container.resolve<ChatService>(
  TOKENS.ChatService 
);
export const postService = container.resolve<PostService>(
  TOKENS.PostService 
);
export const commentService = container.resolve<CommentService>(
  TOKENS.CommentService
);
export const requestService = container.resolve<RequestService>(
  TOKENS.RequestService
);


//providers
export const redisCacheProvider = container.resolve<RedisCacheProvider>(
  TOKENS.RedisCacheProvider
)