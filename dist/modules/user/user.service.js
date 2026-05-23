"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = __importDefault(require("../../common/cloud/s3/init"));
const user_repository_1 = __importDefault(require("../../DB/models/user/user.repository"));
const common_1 = require("../../common");
class UserService {
    cloudProvider;
    userRepository;
    constructor(cloudProvider, userRepository) {
        this.cloudProvider = cloudProvider;
        this.userRepository = userRepository;
    }
    async uploadProfilePic(file, userId) {
        // 1. upload to s3
        const key = await this.cloudProvider.uploadFile(file, `users/${userId.toString()}`);
        // 2. update DB
        const user = await this.userRepository.updateOne({ _id: userId }, { profilePic: key }, {
            returnDocument: "before"
        });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        // 3. delete old pp
        if (user.profilePic)
            await this.cloudProvider.deleteFile(user.profilePic);
    }
    async profile(userId) {
        return await this.userRepository.getOne({ _id: userId });
    }
}
exports.default = new UserService(init_1.default, user_repository_1.default);
