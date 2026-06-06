"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKENS = void 0;
// map between var name and token
exports.TOKENS = {
    // services
    UserService: Symbol.for("UserService"),
    ChatService: Symbol.for("ChatService"),
    AuthService: Symbol.for("AuthService"),
    PostService: Symbol.for("PostService"),
    CommentService: Symbol.for("CommentService"),
    RequestService: Symbol.for("RequestService"),
    // repositories
    UserRepository: Symbol.for("UserRepository"),
    ChatRepository: Symbol.for("ChatRepository"),
    PostRepository: Symbol.for("PostRepository"),
    CommentRepository: Symbol.for("CommentRepository"),
    RequestRepository: Symbol.for("RequestRepository"),
    UserFriendRepository: Symbol.for("UserFriendRepository"),
    UserReactionRepository: Symbol.for("UserReactionRepository"),
    MessageRepository: Symbol.for("MessageRepository"),
    //utils
    NodemMailerProvider: Symbol.for("NodemMailerProvider"),
    RedisCacheProvider: Symbol.for("RedisCacheProvider"),
    FirebasePushNotificationProvider: Symbol.for("FirebasePushNotificationProvider"),
    S3CloudProvider: Symbol.for("S3CloudProvider"),
};
