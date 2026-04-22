"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
//first we create the interface of the model and use it here!
const schema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: String,
    attachments: [String],
    reactionCount: {
        type: Number,
        default: 0,
    },
    commentCount: {
        type: Number,
        default: 0,
    },
    shareCount: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
exports.Post = (0, mongoose_1.model)("Post", schema);
