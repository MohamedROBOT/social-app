import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import requestService from "./request.service";
import { Types } from "mongoose";
import { isAuthenticated } from "../../middleware";
const router = Router();

router.post(
  "/:receiverId",
  //auth middleware
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    await requestService.sendRequest(
      new Types.ObjectId(req.user.sub),
      new Types.ObjectId(req.params.receiverId as string),
    );

    return res.sendStatus(204);
  },
);
router.post(
  "/accept/:id",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    await requestService.acceptRequest(
      new Types.ObjectId(req.user.sub),
      new Types.ObjectId(req.params.id as string),
    );
    return res.sendStatus(204);
  },
);
router.delete(
  "/decline/:id",
  //auth
  async (req: Request, res: Response, next: NextFunction) => {
    await requestService.declineRequest2(
      new Types.ObjectId("69f21a6b6bdb8ac790d5a78a"),
      new Types.ObjectId(req.params.id as string),
    );

    return res.sendStatus(204);
  },
);
router.delete(
  "/delete/:id",
  //auth
  async (req: Request, res: Response, next: NextFunction) => {
    await requestService.removeFriend2(
      new Types.ObjectId("69f21a6b6bdb8ac790d5a78a"),
      new Types.ObjectId(req.params.id as string),
    );

    return res.sendStatus(204);
  },
);

export default router;
