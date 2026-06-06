import { Types } from "mongoose";
import { inject, injectable } from "tsyringe";
import { NotFoundException, ON_MODEL } from "../../common";
import { ICacheProvider } from "../../common/cache/cache.interface";
import { INotificationProvider } from "../../common/notification/notification.interface";
import { PostRepository } from "../../DB/models/post/post.repository";
import { UserReactionRepository } from "../../DB/models/user-reaction/user-reaction.repository";
import { AddReactionDTO, CreatePostDTO } from "./post.dto";
import { TOKENS } from "../../common/DI/tokens";
@injectable()
export class PostService {
  constructor(
    @inject(TOKENS.PostRepository)
    private readonly postRepository: PostRepository,
    @inject(TOKENS.UserReactionRepository)
    private readonly userReactionRepository: UserReactionRepository,
    @inject(TOKENS.FirebasePushNotificationProvider)
    private readonly notificationProvider: INotificationProvider,
    @inject(TOKENS.RedisCacheProvider)
    private readonly cacheProvider: ICacheProvider,
  ) {}
  async get(postId: Types.ObjectId) {
    return await this.postRepository.getOne(
      { _id: postId },
      {},
      { populate: [{ path: "userId" }] },
    );
  }
  async create(createPostDTO: CreatePostDTO, userId: Types.ObjectId) {
    return await this.postRepository.create({ ...createPostDTO, userId });
  }

  async update(updatePostDTO: CreatePostDTO, postId: Types.ObjectId) {
    //check post existence
    //
    return await this.postRepository.updateOne({ _id: postId }, updatePostDTO, {
      returnDocument: "after",
    });
  }

  async delete(postId: Types.ObjectId) {
    return await this.postRepository.deleteOne({ _id: postId });
  }

  async addReaction(addReactionDTO: AddReactionDTO, userId: Types.ObjectId) {
    //check post existence
    const postExist = await this.postRepository.getOne({
      _id: addReactionDTO.postId,
    });
    if (!postExist) throw new NotFoundException("post not found");

    //check user reaction
    const userReaction = await this.userReactionRepository.getOne({
      onModel: ON_MODEL.Post,
      refId: addReactionDTO.postId,
      userId,
    });

    //add reaction if not exist
    if (!userReaction) {
      this.userReactionRepository.create({
        onModel: ON_MODEL.Post,
        refId: addReactionDTO.postId,
        userId,
        reaction: addReactionDTO.reaction,
      });
      await this.postRepository.updateOne(
        {
          _id: addReactionDTO.postId,
        },
        {
          $inc: { reactionCount: 1 },
        },
      );
      return;
    }

    //if the same reaction >> remove reaction
    if (userReaction.reaction === addReactionDTO.reaction) {
      await this.userReactionRepository.deleteOne({
        _id: userReaction._id,
      });

      await this.postRepository.updateOne(
        {
          _id: addReactionDTO.postId,
        },
        {
          $inc: { reactionCount: -1 },
        },
      );
      return;
    }
    //if different reaction >> update
    await this.userReactionRepository.updateOne(
      {
        _id: userReaction._id,
      },
      {
        reaction: addReactionDTO.reaction,
      },
    );
    return;
  }
}
