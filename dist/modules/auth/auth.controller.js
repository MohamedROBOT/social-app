"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_validation_1 = require("./auth.validation");
const middleware_1 = require("../../middleware");
const common_1 = require("../../common");
const router = (0, express_1.Router)();
router.post("/signin", async (req, res, next) => {
    const tokens = await common_1.authService.signin(req.body);
    res.status(200).json({
        success: true,
        message: "Signin successful",
        ...tokens,
    });
});
router.post("/signup", (0, middleware_1.isValid)(auth_validation_1.signupSchema), async (req, res, next) => {
    //service
    await common_1.authService.signup(req.body);
    //send response
    return res.status(201).json({
        success: true,
        message: "OTP has been sent to your email",
    });
});
router.post("/verify-account", async (req, res, next) => {
    //service
    await common_1.authService.verifyAccount(req.body);
    //send response
    return res.status(200).json({
        success: true,
        message: "Account verified successfully",
    });
});
router.post("/send-otp", async (req, res, next) => {
    //service
    await common_1.authService.sendOTP(req.body);
    //send response
    return res.status(200).json({
        success: true,
        message: "otp has been sent to your email",
    });
});
router.patch("/reset-password", async (req, res, next) => {
    await common_1.authService.resetPassword(req.body);
    res.status(200).json({
        success: true,
        message: "password has been reset successfully",
    });
});
exports.default = router;
