"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("../../common");
const user_friend_repository_1 = require("../../DB/models/user-friend/user-friend.repository");
const user_repository_1 = require("../../DB/models/user/user.repository");
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../common/DI/tokens");
let UserService = class UserService {
    cloudProvider;
    userRepository;
    userFriendRepository;
    constructor(cloudProvider, userRepository, userFriendRepository) {
        this.cloudProvider = cloudProvider;
        this.userRepository = userRepository;
        this.userFriendRepository = userFriendRepository;
    }
    async uploadProfilePic(file, userId) {
        // 1. upload to s3
        const key = await this.cloudProvider.uploadFile(file, `users/${userId.toString()}`);
        // 2. update DB
        const user = await this.userRepository.updateOne({ _id: userId }, { profilePic: key }, {
            returnDocument: "before",
        });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        // 3. delete old pp
        if (user.profilePic)
            await this.cloudProvider.deleteFile(user.profilePic);
    }
    async profile(userId) {
        const user = await this.userRepository.getOne({ _id: userId });
        //you might be the sender (and he accept) or receiver (incase you accept)
        const friends = await this.userFriendRepository.getAll({
            $or: [{ user: userId }, { friend: userId }],
        }, {}, { populate: [{ path: "user" }, { path: "friend" }] });
        //get groups
        //groups
        return { user, friends };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.TOKENS.S3CloudProvider)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.TOKENS.UserRepository)),
    __param(2, (0, tsyringe_1.inject)(tokens_1.TOKENS.UserFriendRepository)),
    __metadata("design:paramtypes", [Object, user_repository_1.UserRepository,
        user_friend_repository_1.UserFriendRepository])
], UserService);
