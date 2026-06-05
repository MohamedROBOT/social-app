"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const common_1 = require("../../common");
const user_service_1 = __importDefault(require("./user.service"));
const mongoose_1 = require("mongoose");
const middleware_1 = require("../../middleware");
const router = (0, express_1.Router)();
//upload profile picture
router.post("/profile-pic", 
//auth
(0, common_1.multerUploadFile)().single("profile-pic"), async (req, res, next) => {
    await user_service_1.default.uploadProfilePic(req.file, new mongoose_1.Types.ObjectId("69dfad1d0be24b44e159fa94"));
    return res.status(200).json({
        success: true,
        message: "Profile picture uploaded successfully",
    });
});
router.get("/", middleware_1.isAuthenticated, async (req, res, next) => {
    const user = await user_service_1.default.profile(new mongoose_1.Types.ObjectId(req.user.sub));
    return res.status(200).json({
        success: true,
        message: "user profile fetched successfully",
        data: user,
    });
});
exports.default = router;
