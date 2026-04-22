import { Types } from "mongoose";
import { ON_MODEL, SYS_REACTION } from "../enums";

export interface IUserReaction {
    userId: Types.ObjectId,
    refId: Types.ObjectId, //post or comment or reel or story
    onModel: ON_MODEL, //model name
    reaction: SYS_REACTION //0: like, 1: love, 2: haha, 3: wow, 4: sad, 5: angry

}