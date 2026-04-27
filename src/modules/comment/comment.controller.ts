import { NextFunction, Request, Response, Router } from "express";
import commentService from "./comment.service";
import { Types } from "mongoose";
import { addReaction } from "../../common";
import { commentRepository } from "../../DB/models/comment/comment.repository";

const router = Router({ mergeParams: true });

router.post(
  "/add-reaction",
  //authentication middleware
  //file upload
  //validation layer
  async (req: Request, res: Response, next: NextFunction) => {
    //use manual userId
    await addReaction(
      req.body,
      new Types.ObjectId("69dfad1d0be24b44e159fa94"),
      commentRepository,
    );

    res.sendStatus(204);
  },
);

//merge params
router.post(
  "{/:parentId}",
  //authentication middleware
  //file upload
  //validation layer
  async (req: Request, res: Response, next: NextFunction) => {
    //use manual userId
    await commentService.create(
      req.body,
      req.params,
      new Types.ObjectId("69dfad1d0be24b44e159fa94"),
    );

    res.sendStatus(204);
  },
);

router.get(
  "/:postId{/:parentId}",
  async (req: Request, res: Response, next: NextFunction) => {
    const comments = await commentService.getAll(req.params);
    res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      data: {
        comments,
      },
    });
  },
);

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    await commentService.delete(
      new Types.ObjectId(req.params.id as string), //type assertion 100% sure
      new Types.ObjectId("69dfad1d0be24b44e159fa94"),
    );
    return res.sendStatus(204);
  },
);
export default router;
