import { Types } from "mongoose";
import { AddReactionDTO } from "../dto";
import { BadRequestException, NotFoundException } from "../utils";
import { UserReactionRepository } from "../../DB/models/user-reaction/user-reaction.repository";
import { ON_MODEL } from "../enums";
import { PostRepository } from "../../DB/models/post/post.repository";
import { CommentRepository } from "../../DB/models/comment/comment.repository";
const toModel = (model: string) => {
  switch (model) {
    case "posts":
      return ON_MODEL.Post;
    case "comments":
      return ON_MODEL.Comment;
    default:
      throw new BadRequestException("invalid model");
  }
};
export const addReaction = async (
  addReactionDTO: AddReactionDTO,
  userId: Types.ObjectId,
  repo: PostRepository | CommentRepository,
) => {
  const userReactionRepository = new UserReactionRepository();
  //check post existence
  const docExist = await repo.getOne({
    _id: addReactionDTO.id,
  });

  if (!docExist) throw new NotFoundException(`${repo.model.modelName} not found`);
  const model = toModel(docExist.collection.name);

  //check user reaction
  const userReaction = await userReactionRepository.getOne({
    onModel: model,
    refId: addReactionDTO.id,
    userId,
  });
  //add reaction if not exist
  if (!userReaction) {
    userReactionRepository.create({
      onModel: model,
      refId: addReactionDTO.id,
      userId,
      reaction: addReactionDTO.reaction,
    });
    await repo.updateOne(
      {
        _id: addReactionDTO.id,
      },
      {
        $inc: { reactionCount: 1 },
      },
    );
    return;
  }

  //if the same reaction >> remove reaction
  if (userReaction.reaction === addReactionDTO.reaction) {
    await userReactionRepository.deleteOne({
      _id: userReaction._id,
    });

    repo.updateOne(
      {
        _id: addReactionDTO.id,
      },
      {
        $inc: { reactionCount: -1 },
      },
    );
    return;
  }
  //if different reaction >> update
  await userReactionRepository.updateOne(
    {
      _id: userReaction._id,
    },
    {
      reaction: addReactionDTO.reaction,
    },
  );
  return;
};
