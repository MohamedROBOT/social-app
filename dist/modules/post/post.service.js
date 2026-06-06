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
exports.PostService = void 0;
const tsyringe_1 = require("tsyringe");
const common_1 = require("../../common");
const post_repository_1 = require("../../DB/models/post/post.repository");
const user_reaction_repository_1 = require("../../DB/models/user-reaction/user-reaction.repository");
const tokens_1 = require("../../common/DI/tokens");
let PostService = class PostService {
    postRepository;
    userReactionRepository;
    notificationProvider;
    cacheProvider;
    constructor(postRepository, userReactionRepository, notificationProvider, cacheProvider) {
        this.postRepository = postRepository;
        this.userReactionRepository = userReactionRepository;
        this.notificationProvider = notificationProvider;
        this.cacheProvider = cacheProvider;
    }
    async get(postId) {
        return await this.postRepository.getOne({ _id: postId }, {}, { populate: [{ path: "userId" }] });
    }
    async create(createPostDTO, userId) {
        return await this.postRepository.create({ ...createPostDTO, userId });
    }
    async update(updatePostDTO, postId) {
        //check post existence
        //
        return await this.postRepository.updateOne({ _id: postId }, updatePostDTO, {
            returnDocument: "after",
        });
    }
    async delete(postId) {
        return await this.postRepository.deleteOne({ _id: postId });
    }
    async addReaction(addReactionDTO, userId) {
        //check post existence
        const postExist = await this.postRepository.getOne({
            _id: addReactionDTO.postId,
        });
        if (!postExist)
            throw new common_1.NotFoundException("post not found");
        //check user reaction
        const userReaction = await this.userReactionRepository.getOne({
            onModel: common_1.ON_MODEL.Post,
            refId: addReactionDTO.postId,
            userId,
        });
        //add reaction if not exist
        if (!userReaction) {
            this.userReactionRepository.create({
                onModel: common_1.ON_MODEL.Post,
                refId: addReactionDTO.postId,
                userId,
                reaction: addReactionDTO.reaction,
            });
            await this.postRepository.updateOne({
                _id: addReactionDTO.postId,
            }, {
                $inc: { reactionCount: 1 },
            });
            return;
        }
        //if the same reaction >> remove reaction
        if (userReaction.reaction === addReactionDTO.reaction) {
            await this.userReactionRepository.deleteOne({
                _id: userReaction._id,
            });
            await this.postRepository.updateOne({
                _id: addReactionDTO.postId,
            }, {
                $inc: { reactionCount: -1 },
            });
            return;
        }
        //if different reaction >> update
        await this.userReactionRepository.updateOne({
            _id: userReaction._id,
        }, {
            reaction: addReactionDTO.reaction,
        });
        return;
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.TOKENS.PostRepository)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.TOKENS.UserReactionRepository)),
    __param(2, (0, tsyringe_1.inject)(tokens_1.TOKENS.FirebasePushNotificationProvider)),
    __param(3, (0, tsyringe_1.inject)(tokens_1.TOKENS.RedisCacheProvider)),
    __metadata("design:paramtypes", [post_repository_1.PostRepository,
        user_reaction_repository_1.UserReactionRepository, Object, Object])
], PostService);
