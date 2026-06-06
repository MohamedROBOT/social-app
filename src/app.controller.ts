import "reflect-metadata";

import cors from "cors";
import type { NextFunction, Request, Response } from "express";
import express from "express";
import { GraphQLError } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import { ruruHTML } from "ruru/server";
import { BadRequestException, NotFoundException } from "./common";
import s3CloudProvider from "./common/cloud/s3/init";
import { PORT } from "./config";
import { connectDB } from "./DB/connection";
import { connectRedis } from "./DB/redis.connection";
import { schema } from "./graphql/schema.gql";
import {
  authRouter,
  chatRouter,
  commentRouter,
  postRouter,
  requestRouter,
  userRouter,
} from "./modules";
import { RealtimeGateway } from "./common/realtime-gateway/realtime.gateway";
const pipelinePromise = promisify(pipeline);

const bootstrap = async () => {
  const port = PORT;
  const app = express();
  await connectDB();
  await connectRedis();
  //middleware to get files
  app.get(
    "/uploads/*paths",
    async (req: Request, res: Response, next: NextFunction) => {
      //assert it to string[]
      let key = (req.params.paths as string[]).join("/");
      const fileExist = await s3CloudProvider.getFile(key);
      if (!fileExist) throw new NotFoundException("File not found");
      //file is readStream and res is writeStream so we use pipeline
      await pipelinePromise(fileExist, res);
    },
  );
  //middlewares
  app.use(express.json());
  app.use(cors({ origin: "*" }));
  //graphql route

  app.all(
    "/graphql",
    createHandler({
      context: (req) => {
        //set context
        const headers = req.headers;
        return {
          headers,
        };
      },
      schema,
      formatError: (error) => {
        return {
          message: error.message,
          extensions: {
            success: false,
            statusCode: error.cause ?? 500,
          },
        } as unknown as GraphQLError;
      },
    }),
  );
  // Serve the GraphiQL IDE.
  app.get("/", (_req, res) => {
    res.type("html");
    res.end(ruruHTML({ endpoint: "/graphql" }));
  });
  //routes
  app.use("/auth", authRouter);
  app.use("/post", postRouter);
  app.use("/comment", commentRouter);
  app.use("/request", requestRouter);
  app.use("/user", userRouter);
  app.use("/chat", chatRouter)

  //note: error handle must be the last middleware in the stack because it will catch any error thrown from previous middlewares or routes
  //global error handler middleware
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status((error.cause as number) || 500).json({
      success: false,
      message: error.message,
      // stack: error.stack,
      //we do this because global Error doesn't have details attribute
      details: error instanceof BadRequestException && error.details,
    });
  });
  const server = app.listen(port, () =>
    console.log(`App is listen on port ${port}`),
  );
  const realtimeGateway = new RealtimeGateway(server);
  realtimeGateway.establishConnection();
};
export default bootstrap;
