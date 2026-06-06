import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { isAuthenticated } from "../../middleware";
import { Types } from "mongoose";
import { chatService } from "../../common/";

const router = Router();
router.get(
  "/:chatId",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    const { chat, messages } = await chatService.getChat(
      new Types.ObjectId(req.params.chatId as string),
      new Types.ObjectId(req.user.sub),
    );
    return res.status(200).json({
      success: true,
      data: { chat, messages },
      message: "Chat fetched successfully",
    });
  },
);

export default router;
