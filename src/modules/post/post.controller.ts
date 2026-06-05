import { NextFunction, Request, Response, Router } from "express";
import postService from "./post.service";
import { Types } from "mongoose";

import { isValid } from "../../middleware";
import { default as commentRouter } from "../comment/comment.controller";
import { createPostSchema } from "./post.validation";
const router = Router(); //sub application

//redirect to another sub application (comment)
router.use("/:postId/comment", commentRouter);


router.post(
  "/",
  //add authentication middleware here
  isValid(createPostSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    //dummy data for testing then add middlewares
    const createdPost = await postService.create(
      req.body,
      new Types.ObjectId("69dfad1d0be24b44e159fa94"),
    );
    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: { createdPost },
    });
  },
);

router.post("/reaction", async (req: Request, res: Response, next:NextFunction) => {
   await postService.addReaction(req.body, new Types.ObjectId("69dfad1d0be24b44e159fa94"));
   //204 refer for no content
   return res.status(204).json({
      success: true,
      message: "Reaction added successfully",
   })
});
export default router;
