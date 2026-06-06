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
exports.RequestService = void 0;
const common_1 = require("../../common");
const request_repository_1 = require("../../DB/models/request/request.repository");
const user_friend_repository_1 = require("../../DB/models/user-friend/user-friend.repository");
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../common/DI/tokens");
let RequestService = class RequestService {
    requestRepository;
    userFriendRepository;
    constructor(requestRepository, userFriendRepository) {
        this.requestRepository = requestRepository;
        this.userFriendRepository = userFriendRepository;
    }
    /*
     * @params userId ==> sender {from token}
     * @params receiver ==> from params
     * */
    async sendRequest(senderId, receiverId) {
        //sender is the same as receiver
        if (senderId.toString() === receiverId.toString())
            throw new common_1.BadRequestException("Not allowed to send request to yourself");
        //check block users
        //check receiver existance
        //check user friends or not
        const userFriendExist = await this.userFriendRepository.getOne({
            $or: [
                { user: senderId, friend: receiverId },
                { user: receiverId, friend: senderId },
            ],
        });
        if (userFriendExist)
            throw new common_1.BadRequestException("You are already friends");
        //check sender send request or receiver
        const requestExist = await this.requestRepository.getOne({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId },
            ],
        });
        if (requestExist)
            throw new common_1.BadRequestException("Request already exists");
        // create request
        await this.requestRepository.create({
            sender: senderId,
            receiver: receiverId,
        });
        // send notification
    }
    /*
     * @params userId ==> user from token
     * @params id ==> requestId
     * */
    async acceptRequest(userId, id) {
        //check request existence
        const requestExist = await this.requestRepository.getOne({ _id: id });
        if (!requestExist)
            throw new common_1.NotFoundException("Request not found");
        //if yes, receiver accept request
        if (!requestExist.receiver.equals(userId))
            throw new common_1.UnAuthorizedException("You are not authorized to accept request");
        //delete request from request collection
        await this.requestRepository.deleteOne({ _id: id });
        //create user-friend model
        await this.userFriendRepository.create({
            user: userId,
            friend: requestExist.sender,
        });
    }
    /*
     * @params userId ==> logged in user
     * @params id ==> request id
     */
    async declineRequest(userId, id) {
        //check request existence
        const requestExist = await this.requestRepository.getOne({ _id: id });
        if (!requestExist)
            throw new common_1.NotFoundException("Request not found");
        // if yes, check sender or receiver
        if (!userId.equals(requestExist.sender) ||
            !userId.equals(requestExist.receiver))
            throw new common_1.UnAuthorizedException("You are not authorized to decline or cancel request");
        // delete from request collection
        await this.requestRepository.deleteOne({ _id: id });
    }
    //another solution
    async declineRequest2(userId, id) {
        //check request existence
        const { deletedCount } = await this.requestRepository.deleteOne({
            _id: id,
            $or: [
                {
                    sender: userId,
                },
                {
                    receiver: userId,
                },
            ],
        });
        if (deletedCount === 0)
            throw new common_1.BadRequestException("You are not authorized to decline or cancel request");
    }
    /*
     * @params userId => token
     * @params id => friendId
     */
    async removeFriend(userId, id) {
        //check user friend existence
        const userFriendExist = await this.userFriendRepository.getOne({
            $or: [
                { user: userId, friend: id },
                { user: id, friend: userId },
            ],
        });
        if (!userFriendExist)
            throw new common_1.NotFoundException("Friend not found");
        //if yes, check user or friend
        if (!userId.equals(userFriendExist.user) ||
            !userId.equals(userFriendExist.friend))
            throw new common_1.UnAuthorizedException("You are not authorized to remove friend");
        //delete from user-friend collection
        await this.userFriendRepository.deleteOne({
            _id: userFriendExist._id,
        });
    }
    async removeFriend2(userId, id) {
        if (userId.toString() === id.toString())
            throw new common_1.BadRequestException("Not allowed to remove yourself");
        //delete from user-friend collection
        const { deletedCount } = await this.userFriendRepository.deleteOne({
            $or: [
                { user: userId, friend: id },
                { user: id, friend: userId },
            ],
        });
        if (deletedCount === 0)
            throw new common_1.NotFoundException("You are not friends");
    }
};
exports.RequestService = RequestService;
exports.RequestService = RequestService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.TOKENS.RequestRepository)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.TOKENS.UserFriendRepository)),
    __metadata("design:paramtypes", [request_repository_1.RequestRepository,
        user_friend_repository_1.UserFriendRepository])
], RequestService);
