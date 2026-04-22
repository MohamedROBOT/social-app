"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_service_1 = __importDefault(require("./post.service"));
const mongoose_1 = require("mongoose");
const post_dto_1 = require("./post.dto");
const middleware_1 = require("../../middleware");
const router = (0, express_1.Router)();
router.post("/", 
//add authentication middleware here
(0, middleware_1.isValid)(post_dto_1.createPostSchema), async (req, res, next) => {
    //dummy data for testing then add middlewares
    const createdPost = await post_service_1.default.create(req.body, new mongoose_1.Types.ObjectId("69dfad1d0be24b44e159fa94"));
    return res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: { createdPost },
    });
});
router.post("/reaction", async (req, res, next) => {
    await post_service_1.default.addReaction(req.body, new mongoose_1.Types.ObjectId("69dfad1d0be24b44e159fa94"));
    //204 refer for no content
    return res.status(204).json({
        success: true,
        message: "Reaction added successfully",
    });
});
exports.default = router;
