"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const middleware_1 = require("../../middleware");
const common_1 = require("../../common/");
const router = (0, express_1.Router)();
router.post("/:receiverId", 
//auth middleware
middleware_1.isAuthenticated, async (req, res, next) => {
    await common_1.requestService.sendRequest(new mongoose_1.Types.ObjectId(req.user.sub), new mongoose_1.Types.ObjectId(req.params.receiverId));
    return res.sendStatus(204);
});
router.post("/accept/:id", middleware_1.isAuthenticated, async (req, res, next) => {
    await common_1.requestService.acceptRequest(new mongoose_1.Types.ObjectId(req.user.sub), new mongoose_1.Types.ObjectId(req.params.id));
    return res.sendStatus(204);
});
router.delete("/decline/:id", 
//auth
async (req, res, next) => {
    await common_1.requestService.declineRequest2(new mongoose_1.Types.ObjectId("69f21a6b6bdb8ac790d5a78a"), new mongoose_1.Types.ObjectId(req.params.id));
    return res.sendStatus(204);
});
router.delete("/delete/:id", 
//auth
async (req, res, next) => {
    await common_1.requestService.removeFriend2(new mongoose_1.Types.ObjectId("69f21a6b6bdb8ac790d5a78a"), new mongoose_1.Types.ObjectId(req.params.id));
    return res.sendStatus(204);
});
exports.default = router;
