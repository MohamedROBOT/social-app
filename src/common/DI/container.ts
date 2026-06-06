import { container } from "tsyringe";
import {
  AuthService,
  ChatService,
  CommentService,
  PostService,
  RequestService,
  UserService,
} from "../../modules";

import {
  UserRepository,
  UserFriendRepository,
  ChatRepository,
  PostRepository,
  RequestRepository,
  UserReactionRepository,
  MessageRepository,
  CommentRepository,
} from "../../DB/models";
import { TOKENS } from "./tokens";
import { NodeMailerProvider } from "../mail/nodemailer/nodemailer.service";
import { RedisCacheProvider } from "../cache/redis/redis.service";
import { FirebasePushNotificationProvider } from "../notification/firebase/firebase.service";
import { S3CloudProvider } from "../cloud/s3/s3.service";

// services
container.registerSingleton(TOKENS.AuthService, AuthService);
container.registerSingleton(TOKENS.UserService, UserService);
container.registerSingleton(TOKENS.ChatService, ChatService);
container.registerSingleton(TOKENS.PostService, PostService);
container.registerSingleton(TOKENS.CommentService, CommentService);
container.registerSingleton(TOKENS.RequestService, RequestService);

// repositories
container.registerSingleton(TOKENS.UserRepository, UserRepository);
container.registerSingleton(TOKENS.UserFriendRepository, UserFriendRepository);
container.registerSingleton(TOKENS.ChatRepository, ChatRepository);
container.registerSingleton(TOKENS.PostRepository, PostRepository);
container.registerSingleton(TOKENS.CommentRepository, CommentRepository);
container.registerSingleton(TOKENS.RequestRepository, RequestRepository);
container.registerSingleton(
  TOKENS.UserReactionRepository,
  UserReactionRepository,
);
container.registerSingleton(TOKENS.MessageRepository, MessageRepository);

//utils
container.registerSingleton(TOKENS.NodemMailerProvider, NodeMailerProvider)
container.registerSingleton(TOKENS.RedisCacheProvider, RedisCacheProvider)
container.registerSingleton(TOKENS.FirebasePushNotificationProvider, FirebasePushNotificationProvider)
container.registerSingleton(TOKENS.S3CloudProvider, S3CloudProvider)
export { container };
