"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const common_1 = require("../../common");
const common_2 = require("../../common");
const router = (0, express_1.Router)({ mergeParams: true });
router.post("/add-reaction", 
//authentication middleware
//file upload
//validation layer
async (req, res, next) => {
    //use manual userId
    await (0, common_1.addReaction)(req.body, new mongoose_1.Types.ObjectId("69dfad1d0be24b44e159fa94"), common_2.commentRepository);
    res.sendStatus(204);
});
//merge params
router.post("{/:parentId}", 
//authentication middleware
//file upload
//validation layer
async (req, res, next) => {
    //use manual userId
    await common_2.commentService.create(req.body, req.params, new mongoose_1.Types.ObjectId("69dfad1d0be24b44e159fa94"));
    res.sendStatus(204);
});
router.get("/:postId{/:parentId}", async (req, res, next) => {
    const comments = await common_2.commentService.getAll(req.params);
    res.status(200).json({
        success: true,
        message: "Comments fetched successfully",
        data: {
            comments,
        },
    });
});
router.delete("/:id", async (req, res, next) => {
    await common_2.commentService.delete(new mongoose_1.Types.ObjectId(req.params.id), //type assertion 100% sure
    new mongoose_1.Types.ObjectId("69dfad1d0be24b44e159fa94"));
    return res.sendStatus(204);
});
exports.default = router;
