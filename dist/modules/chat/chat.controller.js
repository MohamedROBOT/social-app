"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../../middleware");
const mongoose_1 = require("mongoose");
const common_1 = require("../../common/");
const router = (0, express_1.Router)();
router.get("/:chatId", middleware_1.isAuthenticated, async (req, res, next) => {
    const { chat, messages } = await common_1.chatService.getChat(new mongoose_1.Types.ObjectId(req.params.chatId), new mongoose_1.Types.ObjectId(req.user.sub));
    return res.status(200).json({
        success: true,
        data: { chat, messages },
        message: "Chat fetched successfully",
    });
});
exports.default = router;
