"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const tsyringe_1 = require("tsyringe");
Object.defineProperty(exports, "container", { enumerable: true, get: function () { return tsyringe_1.container; } });
const modules_1 = require("../../modules");
const models_1 = require("../../DB/models");
const tokens_1 = require("./tokens");
const nodemailer_service_1 = require("../mail/nodemailer/nodemailer.service");
const redis_service_1 = require("../cache/redis/redis.service");
const firebase_service_1 = require("../notification/firebase/firebase.service");
const s3_service_1 = require("../cloud/s3/s3.service");
// services
tsyringe_1.container.registerSingleton(tokens_1.TOKENS.AuthService, modules_1.AuthService);
tsyringe_1.container.registerSingleton(tokens_1.TOKENS.UserService, modules_1.UserService);
tsyringe_1.container.registerSingleton(tokens_1.TOKENS.ChatService, modules_1.ChatService);
tsyringe_1.container.registerSingleton(tokens_1.TOKENS.PostService, modules_1.PostService);
tsyringe_1.container.registerSingleton(tokens_1.TOKENS.CommentService, modules_1.CommentService);
tsyringe_1.container.registerSingleton(tokens_1.TOKENS.RequestService, modules_1.RequestService);
// repositories
tsyringe_1.container.registerSingleton(tokens_1.TOKENS.UserRepository, models_1.UserRepository);
tsyringe_1.container.registerSingleton(tokens_1.TOKENS.UserFriendRepository, models_1.UserFriendRepository);
tsyringe_1.container.registerSingleton(tokens_1.TOKENS.ChatRepository, models_1.ChatRepository);
tsyringe_1.container.registerSingleton(tokens_1.TOKENS.PostRepository, models_1.PostRepository);
tsyringe_1.container.registerSingleton(tokens_1.TOKENS.CommentRepository, models_1.CommentRepository);
tsyringe_1.container.registerSingleton(tokens_1.TOKENS.RequestRepository, models_1.RequestRepository);
tsyringe_1.container.registerSingleton(tokens_1.TOKENS.UserReactionRepository, models_1.UserReactionRepository);
tsyringe_1.container.registerSingleton(tokens_1.TOKENS.MessageRepository, models_1.MessageRepository);
//utils
tsyringe_1.container.registerSingleton(tokens_1.TOKENS.NodemMailerProvider, nodemailer_service_1.NodeMailerProvider);
tsyringe_1.container.registerSingleton(tokens_1.TOKENS.RedisCacheProvider, redis_service_1.RedisCacheProvider);
tsyringe_1.container.registerSingleton(tokens_1.TOKENS.FirebasePushNotificationProvider, firebase_service_1.FirebasePushNotificationProvider);
tsyringe_1.container.registerSingleton(tokens_1.TOKENS.S3CloudProvider, s3_service_1.S3CloudProvider);
