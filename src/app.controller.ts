import express, { Request, Response, NextFunction } from "express";
import { BadRequestException } from "./common";
import { connectDB } from "./DB/connection";
import { authRouter, commentRouter, postRouter } from "./modules";
import { connectRedis } from "./DB/redis.connection";
export const bootstrap = async () => {
  const port = 3000;
  const app = express();
  await connectDB();
  await connectRedis();
  //middlwares
  app.use(express.json());
  app.use("/auth", authRouter);
  app.use("/post", postRouter);
  app.use("/comment", commentRouter)
  //note: error handle must be the last middleware in the stack because it will catch any error thrown from previous middlewares or routes
  //global error handler middleware
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status((error.cause as number) || 500).json({
      success: false,
      message: error.message,
      stack: error.stack,
      //we do this because global Error doesn't have details attribute
      details: error instanceof BadRequestException && error.details,
    });
  });
  app.listen(port, () => console.log(`App is listen on port ${port}`));
};
