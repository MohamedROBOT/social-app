"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const middleware_1 = require("../../middleware");
const comment_controller_1 = __importDefault(require("../comment/comment.controller"));
const post_validation_1 = require("./post.validation");
const common_1 = require("../../common");
const router = (0, express_1.Router)(); //sub application
//redirect to another sub application (comment)
router.use("/:postId/comment", comment_controller_1.default);
router.post("/", 
//add authentication middleware here
(0, middleware_1.isValid)(post_validation_1.createPostSchema), async (req, res, next) => {
    //dummy data for testing then add middlewares
    const createdPost = await common_1.postService.create(req.body, new mongoose_1.Types.ObjectId("69dfad1d0be24b44e159fa94"));
    return res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: { createdPost },
    });
});
router.post("/reaction", async (req, res, next) => {
    await common_1.postService.addReaction(req.body, new mongoose_1.Types.ObjectId("69dfad1d0be24b44e159fa94"));
    //204 refer for no content
    return res.status(204).json({
        success: true,
        message: "Reaction added successfully",
    });
});
exports.default = router;
