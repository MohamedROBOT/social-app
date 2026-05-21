import type {Request, Response, NextFunction} from "express";
import express from 'express';
import {BadRequestException, NotFoundException} from "./common";
import {connectDB} from "./DB/connection";
import {authRouter, commentRouter, postRouter, requestRouter, userRouter} from "./modules";
import {connectRedis} from "./DB/redis.connection";
import s3CloudProvider from "./common/cloud/s3/init";
import {pipeline} from "node:stream";
import {promisify} from "node:util";

const pipelinePromise = promisify(pipeline)

const bootstrap = async () => {
    const port = 3000;
    const app = express();
    await connectDB();
    await connectRedis();
    //middleware to get files
    app.get('/uploads/*paths', async (req: Request, res: Response, next: NextFunction) => {
        //assert it to string[]
        let key = (req.params.paths as string[]).join('/')
      const fileExist = await s3CloudProvider.getFile(key)
        if(!fileExist) throw new NotFoundException("File not found")
        //file is readStream and res is writeStream so we use pipeline
       await pipelinePromise(fileExist, res)


    })
    //middlewares
    app.use(express.json());
    app.use("/auth", authRouter);
    app.use("/post", postRouter);
    app.use("/comment", commentRouter)
    app.use("/request", requestRouter)
    app.use("/user", userRouter)
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
export default bootstrap
