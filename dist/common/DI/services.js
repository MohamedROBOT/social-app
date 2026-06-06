"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisCacheProvider = exports.requestService = exports.commentService = exports.postService = exports.chatService = exports.userService = exports.authService = void 0;
const container_1 = require("./container");
const tokens_1 = require("./tokens");
exports.authService = container_1.container.resolve(tokens_1.TOKENS.AuthService);
exports.userService = container_1.container.resolve(tokens_1.TOKENS.UserService);
exports.chatService = container_1.container.resolve(tokens_1.TOKENS.ChatService);
exports.postService = container_1.container.resolve(tokens_1.TOKENS.PostService);
exports.commentService = container_1.container.resolve(tokens_1.TOKENS.CommentService);
exports.requestService = container_1.container.resolve(tokens_1.TOKENS.RequestService);
//providers
exports.redisCacheProvider = container_1.container.resolve(tokens_1.TOKENS.RedisCacheProvider);
