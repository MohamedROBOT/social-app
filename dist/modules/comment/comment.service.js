"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_repository_1 = require("../../DB/models/post/post.repository");
const common_1 = require("../../common");
const comment_repository_1 = require("../../DB/models/comment/comment.repository");
class CommentService {
    postRepository;
    commentRepository;
    constructor(postRepository, commentRepository) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }
    async create(createCommentDTO, params, userId) {
        const { postId, parentId } = params;
        //postId check existence
        const post = await this.postRepository.getOne({ _id: postId });
        if (!post)
            throw new common_1.NotFoundException("post not found");
        //if parentId => reply check parentId
        if (parentId) {
            const parentCommentExist = await this.commentRepository.getOne({
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
}
exports.default = new CommentService(new post_repository_1.PostRepository(), new comment_repository_1.CommentRepository());
