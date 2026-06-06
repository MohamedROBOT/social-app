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
exports.CommentService = void 0;
const post_repository_1 = require("../../DB/models/post/post.repository");
const common_1 = require("../../common");
const comment_repository_1 = require("../../DB/models/comment/comment.repository");
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../common/DI/tokens");
let CommentService = class CommentService {
    postRepository;
    commentRepository;
    constructor(postRepository, commentRepository) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }
    async create(createCommentDTO, params, userId) {
        const { postId, parentId } = params;
        //postId check existence
        if (postId) {
            const post = await this.postRepository.getOne({ _id: postId });
            if (!post)
                throw new common_1.NotFoundException("post not found");
        }
        let parentCommentExist;
        //if parentId => reply check parentId
        if (parentId) {
            parentCommentExist = await this.commentRepository.getOne({
                _id: parentId,
            });
            // if no throw error
            if (!parentCommentExist)
                throw new common_1.NotFoundException("comment not found");
        }
        // if yes create comment
        return this.commentRepository.create({
            ...createCommentDTO,
            ...params, //postId, parentId if exist
            userId,
            //postId might be null so we will define it throught old comment
            postId: params.postId || parentCommentExist?.postId,
        });
    }
    async getAll(params) {
        const comments = await this.commentRepository.getAll({
            postId: params.postId,
            parentId: params.parentId,
        });
        if (!comments || comments.length === 0)
            throw new common_1.NotFoundException("comments not found");
        return comments;
    }
    async getOne(commentId) {
        //nested populate
        return await this.commentRepository.getOne({ _id: commentId }, {}, { populate: [{ path: "userId" }, { path: "postId", populate: { path: "userId" } }] });
    }
    async delete(id, userId) {
        //check existence
        const commentExist = await this.commentRepository.getOne({ _id: id }, {}, { populate: [{ path: "postId" }] }); //{} | null
        if (!commentExist)
            throw new common_1.NotFoundException("comment not found");
        //commentAuthor
        let commentAuthor = commentExist.userId.toString();
        //postAuthor
        let postAuthor = commentExist.postId[0]?.userId.toString(); //tye assertion
        const isAllowed = [commentAuthor, postAuthor].includes(userId.toString());
        if (!isAllowed)
            throw new common_1.UnAuthorizedException("You are not authorized to delete this comment");
        //delete comment
        return await this.commentRepository.deleteOne({ _id: id });
        //mongoose middleware
        //document methods => document middlewares
        //query methods => query middleware
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.TOKENS.PostRepository)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.TOKENS.CommentRepository)),
    __metadata("design:paramtypes", [post_repository_1.PostRepository,
        comment_repository_1.CommentRepository])
], CommentService);
