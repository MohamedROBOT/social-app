import { NextFunction, Request, Response, Router } from "express";
import commentService from "./comment.service";
import { Types } from "mongoose";
import { addReaction } from "../../common";
import { commentRepository } from "../../DB/models/comment/comment.repository";

const router = Router();

router.post(
  "/add-reaction",
  //authentication middleware
  //file upload
  //validation layer
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    //use manual userId
   await addReaction(req.body, new Types.ObjectId("69dfad1d0be24b44e159fa94"), commentRepository);

    res.status(204).json({
      success: true,
      message: "reaction added successfully",
    });
  },
);


router.post(
  "/:postId{/:parentId}",
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

    res.status(204).json({
      success: true,
      message: "Comment added successfully",
    });
  },
);


export default router;
