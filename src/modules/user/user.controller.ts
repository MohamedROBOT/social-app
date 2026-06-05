import { NextFunction, Request, Response, Router } from "express";
import { multerUploadFile } from "../../common";
import userService from "./user.service";
import { Types } from "mongoose";
import { isAuthenticated } from "../../middleware";

const router = Router();
//upload profile picture
router.post(
  "/profile-pic",
  //auth
  multerUploadFile().single("profile-pic"),
  async (req: Request, res: Response, next: NextFunction) => {
    await userService.uploadProfilePic(
      req.file as Express.Multer.File,
      new Types.ObjectId("69dfad1d0be24b44e159fa94"),
    );
    return res.status(200).json({
      success: true,
      message: "Profile picture uploaded successfully",
    });
  },
);

router.get(
  "/",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.profile(new Types.ObjectId(req.user.sub));
    return res.status(200).json({
      success: true,
      message: "user profile fetched successfully",
      data: user,
    });
  },
);

export default router;
