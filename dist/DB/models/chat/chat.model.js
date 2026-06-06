"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("../../../common");
const schema = new mongoose_1.Schema({
    participants: { type: [mongoose_1.Schema.Types.ObjectId], ref: "User" },
    chatType: {
        type: Number,
        enum: common_1.SYS_CHAT_TYPE,
        default: common_1.SYS_CHAT_TYPE.private,
    },
    admin: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "User",
        required: function () {
            return this.chatType === common_1.SYS_CHAT_TYPE.group;
        },
    },
    groupImage: { type: String },
    groupName: { type: String },
    groupDescription: { type: String }
}, { timestamps: true });
exports.Chat = (0, mongoose_1.model)("Chat", schema);
