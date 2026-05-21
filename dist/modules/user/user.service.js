"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = __importDefault(require("../../common/cloud/s3/init"));
class UserService {
    cloudProvider;
    constructor(cloudProvider) {
        this.cloudProvider = cloudProvider;
    }
    async uploadProfilePic(file, userId) {
        return await this.cloudProvider.uploadFile(file, `users/${userId.toString()}`);
    }
}
exports.default = new UserService(init_1.default);
