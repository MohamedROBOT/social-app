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
}
exports.default = new CommentService(new post_repository_1.PostRepository(), new comment_repository_1.CommentRepository());
