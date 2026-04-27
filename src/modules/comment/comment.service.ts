import { Types } from "mongoose";
import { CreateCommentDTO } from "./comment.dto";
import { PostRepository } from "../../DB/models/post/post.repository";
import {
  BadRequestException,
  IPost,
  NotFoundException,
  ParamsDTO,
  UnAuthorizedException,
} from "../../common";
import { CommentRepository } from "../../DB/models/comment/comment.repository";

class CommentService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly commentRepository: CommentRepository,
  ) {}

  async create(
    createCommentDTO: CreateCommentDTO,
    params: any,
    userId: Types.ObjectId,
  ) {
    const { postId, parentId } = params;
    //postId check existence
    if (postId) {
      const post = await this.postRepository.getOne({ _id: postId });
      if (!post) throw new NotFoundException("post not found");
    }
    let parentCommentExist;
    //if parentId => reply check parentId
    if (parentId) {
      parentCommentExist = await this.commentRepository.getOne({
        _id: parentId,
      });

      // if no throw error
      if (!parentCommentExist) throw new NotFoundException("comment not found");
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

  async getAll(params: any) {
    const comments = await this.commentRepository.getAll({
      postId: params.postId,
      parentId: params.parentId,
    });
    if (!comments || comments.length === 0)
      throw new NotFoundException("comments not found");
    return comments;
  }

  async delete(id: Types.ObjectId, userId: Types.ObjectId) {
    //check existence
    const commentExist = await this.commentRepository.getOne(
      { _id: id },
      {},
      { populate: [{ path: "postId" }] },
    ); //{} | null
    if (!commentExist) throw new NotFoundException("comment not found");
    //commentAuthor
    let commentAuthor = commentExist.userId.toString();
    //postAuthor
    let postAuthor = (commentExist.postId as IPost[])[0]?.userId.toString(); //tye assertion
    const isAllowed = [commentAuthor, postAuthor].includes(userId.toString());
    if (!isAllowed)
      throw new UnAuthorizedException(
        "You are not authorized to delete this comment",
      );
    //delete comment
    return await this.commentRepository.deleteOne({ _id: id });

    //mongoose middleware
    //document methods => document middlewares
    //query methods => query middleware
  }
}

export default new CommentService(
  new PostRepository(),
  new CommentRepository(),
);
