"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Post", //model name
        required: true
    },
    parentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Comment"
    },
    mentions: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User"
        }], //array of user ids
    content: String,
    attachment: String,
    reactionCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
schema.pre('deleteOne', async function () {
    let filter = this.getFilter();
    //find all replies
    const replies = await this.model.find({ parentId: filter._id }); //array or []
    //if replies >> loop over them and deleteOne
    if (replies.length > 0) {
        for (const reply of replies) {
            await this.model.deleteOne({ _id: reply._id });
        }
    }
    //return
});
exports.Comment = (0, mongoose_1.model)("Comment", schema);
