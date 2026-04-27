import { type NextFunction, Request, type Response, Router } from "express";
import authService from "./auth.service";
import { signupSchema } from "./auth.validation";
import { isValid } from "../../middleware";
const router = Router();

router.post(
  "/signin",
  async (req: Request, res: Response, next: NextFunction) => {
    const tokens = await authService.login(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      ...tokens,
    });
  },
);
router.post(
  "/signup",
  isValid(signupSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    //service
    await authService.signup(req.body);
    //send response
    return res.status(201).json({
      success: true,
      message: "OTP has been sent to your email",
    });
  },
);
router.post(
  "/verify-account",

  async (req: Request, res: Response, next: NextFunction) => {
    //service
    await authService.verifyAccount(req.body);
    //send response
    return res.status(200).json({
      success: true,
      message: "Account verified successfully",
    });
  },
);
router.post(
  "/send-otp",

  async (req: Request, res: Response, next: NextFunction) => {
    //service
    await authService.sendOTP(req.body);
    //send response
    return res.status(200).json({
      success: true,
      message: "otp has been sent to your email",
    });
  },
);

router.patch(
  "/reset-password",
  async (req: Request, res: Response, next: NextFunction) => {
    await authService.resetPassword(req.body);
    res.status(200).json({
      success: true,
      message: "password has been reset successfully",
    });
  },
);
export default router;
