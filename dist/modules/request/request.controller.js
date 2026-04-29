"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const request_service_1 = __importDefault(require("./request.service"));
const mongoose_1 = require("mongoose");
const router = (0, express_1.Router)();
router.post("/:receiverId", 
//auth middleware
async (req, res, next) => {
    await request_service_1.default.sendRequest(new mongoose_1.Types.ObjectId("69dfad1d0be24b44e159fa94"), new mongoose_1.Types.ObjectId(req.params.receiverId));
    return res.sendStatus(204);
});
router.post("/accept/:id", 
//auth
async (req, res, next) => {
    await request_service_1.default.acceptRequest(new mongoose_1.Types.ObjectId("69f21a6b6bdb8ac790d5a78a"), new mongoose_1.Types.ObjectId(req.params.id));
    return res.sendStatus(204);
});
router.delete("/decline/:id", 
//auth
async (req, res, next) => {
    await request_service_1.default.declineRequest2(new mongoose_1.Types.ObjectId("69f21a6b6bdb8ac790d5a78a"), new mongoose_1.Types.ObjectId(req.params.id));
    return res.sendStatus(204);
});
router.delete("/delete/:id", 
//auth
async (req, res, next) => {
    await request_service_1.default.removeFriend2(new mongoose_1.Types.ObjectId("69f21a6b6bdb8ac790d5a78a"), new mongoose_1.Types.ObjectId(req.params.id));
    return res.sendStatus(204);
});
exports.default = router;
