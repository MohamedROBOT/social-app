import { Types } from "mongoose";
import { CreateCommentDTO } from "./comment.dto";
import { PostRepository } from "../../DB/models/post/post.repository";
import { NotFoundException } from "../../common";
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
    const post = await this.postRepository.getOne({ _id: postId });
    if (!post) throw new NotFoundException("post not found");

    //if parentId => reply check parentId
    if (parentId) {
      const parentCommentExist = await this.commentRepository.getOne({
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
    });
  }
}

export default new CommentService(
    new PostRepository(),
    new CommentRepository(),
)