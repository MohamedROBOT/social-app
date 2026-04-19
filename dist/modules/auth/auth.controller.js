"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = __importDefault(require("./auth.service"));
const auth_validation_1 = require("./auth.validation");
const middleware_1 = require("../../middleware");
const router = (0, express_1.Router)();
router.post("/signup", (0, middleware_1.isValid)(auth_validation_1.signupSchema), async (req, res, next) => {
    //service
    await auth_service_1.default.signup(req.body);
    //send response
    return res.status(201).json({
        success: true,
        message: "OTP has been sent to your email",
    });
});
router.post("/verify-account", async (req, res, next) => {
    //service
    await auth_service_1.default.verifyAccount(req.body);
    //send response
    return res.status(200).json({
        success: true,
        message: "Account verified successfully",
    });
});
router.post("/send-otp", async (req, res, next) => {
    //service
    await auth_service_1.default.sendOTP(req.body);
    //send response
    return res.status(200).json({
        success: true,
        message: "otp has been sent to your email",
    });
});
router.patch("/reset-password", async (req, res, next) => {
    await auth_service_1.default.resetPassword(req.body);
    res.status(200).json({
        success: true,
        message: "password has been reset successfully"
    });
});
exports.default = router;
