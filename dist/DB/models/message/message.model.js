"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    content: String,
    sender: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    chat: { type: mongoose_1.Schema.Types.ObjectId, ref: "Chat", required: true },
}, { timestamps: true });
exports.Message = (0, mongoose_1.model)("Message", schema);
