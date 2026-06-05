import { Types } from "mongoose";
import postRepository, { PostRepository } from "../../DB/models/post/post.repository";
import { AddReactionDTO, CreatePostDTO } from "./post.dto";
import { NotFoundException, ON_MODEL } from "../../common";
import { UserReactionRepository } from "../../DB/models/user-reaction/user-reaction.repository";
import {INotificationProvider} from "../../common/notification/notification.interface";
import firebasePushNotificationProvider from "../../common/notification/firebase/init"
import {ICacheProvider} from "../../common/cache/cache.interface";
import redisCacheProvider from "../../common/cache/redis/init";
export class PostServices {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userReactionRepository: UserReactionRepository,
  private readonly notificationProvider:INotificationProvider,
    private readonly cacheProvider:ICacheProvider
  ) {}
async get(postId: Types.ObjectId){
   return await this.postRepository.getOne({_id: postId},{},{populate:[{path:"userId"}]})
}
  async create(createPostDTO: CreatePostDTO, userId: Types.ObjectId) {
    return await this.postRepository.create({ ...createPostDTO, userId });
  }

  async update(updatePostDTO: CreatePostDTO, postId: Types.ObjectId) {
    //check post existence
    //
    return await this.postRepository.updateOne({_id: postId},updatePostDTO, {returnDocument: "after"})
  }

  async delete (postId:Types.ObjectId) {
    return await this.postRepository.deleteOne({_id:postId})
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
    await this.userReactionRepository.updateOne({
      _id: userReaction._id,
    }, {
        reaction: addReactionDTO.reaction,
      });
      return;
  }


}

export default new PostServices(
  postRepository,
  new UserReactionRepository(),
  firebasePushNotificationProvider,
    redisCacheProvider

);
