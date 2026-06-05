"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostServices = void 0;
const post_repository_1 = __importDefault(require("../../DB/models/post/post.repository"));
const common_1 = require("../../common");
const user_reaction_repository_1 = require("../../DB/models/user-reaction/user-reaction.repository");
const init_1 = __importDefault(require("../../common/notification/firebase/init"));
const init_2 = __importDefault(require("../../common/cache/redis/init"));
class PostServices {
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
        return await this.postRepository.updateOne({ _id: postId }, updatePostDTO, { returnDocument: "after" });
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
}
exports.PostServices = PostServices;
exports.default = new PostServices(post_repository_1.default, new user_reaction_repository_1.UserReactionRepository(), init_1.default, init_2.default);
