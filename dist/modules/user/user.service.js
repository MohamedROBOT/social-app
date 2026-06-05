"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = __importDefault(require("../../common/cloud/s3/init"));
const user_repository_1 = __importDefault(require("../../DB/models/user/user.repository"));
const common_1 = require("../../common");
const user_friend_repository_1 = __importDefault(require("../../DB/models/user-friend/user-friend.repository"));
class UserService {
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
}
exports.default = new UserService(init_1.default, user_repository_1.default, user_friend_repository_1.default);
