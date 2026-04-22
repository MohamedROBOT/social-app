import { model, Schema } from "mongoose";
import { required } from "zod/mini";
import { IComment } from "../../../common";

const schema = new Schema<IComment>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post", //model name
        required: true
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref:"Comment"
    },
    mentions: [{
        type: Schema.Types.ObjectId,
        ref:"User"
    }], //array of user ids
    content: String,
    attachment: String,
    reactionCount:{
        type: Number,
        default: 0
    }
},{timestamps: true})

export const Comment = model("Comment", schema)