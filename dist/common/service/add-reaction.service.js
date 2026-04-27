"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReaction = void 0;
const utils_1 = require("../utils");
const user_reaction_repository_1 = require("../../DB/models/user-reaction/user-reaction.repository");
const enums_1 = require("../enums");
const toModel = (model) => {
    switch (model) {
        case "posts":
            return enums_1.ON_MODEL.Post;
        case "comments":
            return enums_1.ON_MODEL.Comment;
        default:
            throw new utils_1.BadRequestException("invalid model");
    }
};
const addReaction = async (addReactionDTO, userId, repo) => {
    const userReactionRepository = new user_reaction_repository_1.UserReactionRepository();
    //check post existence
    const docExist = await repo.getOne({
        _id: addReactionDTO.id,
    });
    if (!docExist)
        throw new utils_1.NotFoundException(`${repo.model.modelName} not found`);
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
        await repo.updateOne({
            _id: addReactionDTO.id,
        }, {
            $inc: { reactionCount: 1 },
        });
        return;
    }
    //if the same reaction >> remove reaction
    if (userReaction.reaction === addReactionDTO.reaction) {
        await userReactionRepository.deleteOne({
            _id: userReaction._id,
        });
        repo.updateOne({
            _id: addReactionDTO.id,
        }, {
            $inc: { reactionCount: -1 },
        });
        return;
    }
    //if different reaction >> update
    await userReactionRepository.updateOne({
        _id: userReaction._id,
    }, {
        reaction: addReactionDTO.reaction,
    });
    return;
};
exports.addReaction = addReaction;
