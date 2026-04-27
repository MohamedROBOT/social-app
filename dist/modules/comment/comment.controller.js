"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_service_1 = __importDefault(require("./comment.service"));
const mongoose_1 = require("mongoose");
const common_1 = require("../../common");
const comment_repository_1 = require("../../DB/models/comment/comment.repository");
const router = (0, express_1.Router)({ mergeParams: true });
router.post("/add-reaction", 
//authentication middleware
//file upload
//validation layer
async (req, res, next) => {
    //use manual userId
    await (0, common_1.addReaction)(req.body, new mongoose_1.Types.ObjectId("69dfad1d0be24b44e159fa94"), comment_repository_1.commentRepository);
    res.sendStatus(204);
});
//merge params
router.post("{/:parentId}", 
//authentication middleware
//file upload
//validation layer
async (req, res, next) => {
    //use manual userId
    await comment_service_1.default.create(req.body, req.params, new mongoose_1.Types.ObjectId("69dfad1d0be24b44e159fa94"));
    res.sendStatus(204);
});
router.get("/:postId{/:parentId}", async (req, res, next) => {
    const comments = await comment_service_1.default.getAll(req.params);
    res.status(200).json({
        success: true,
        message: "Comments fetched successfully",
        data: {
            comments,
        },
    });
});
router.delete("/:id", async (req, res, next) => {
    await comment_service_1.default.delete(new mongoose_1.Types.ObjectId(req.params.id), //type assertion 100% sure
    new mongoose_1.Types.ObjectId("69dfad1d0be24b44e159fa94"));
    return res.sendStatus(204);
});
exports.default = router;
