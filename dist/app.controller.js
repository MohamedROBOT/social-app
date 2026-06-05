"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_2 = require("graphql-http/lib/use/express");
const node_stream_1 = require("node:stream");
const node_util_1 = require("node:util");
const server_1 = require("ruru/server");
const common_1 = require("./common");
const init_1 = __importDefault(require("./common/cloud/s3/init"));
const config_1 = require("./config");
const connection_1 = require("./DB/connection");
const redis_connection_1 = require("./DB/redis.connection");
const schema_gql_1 = require("./graphql/schema.gql");
const modules_1 = require("./modules");
const realtime_gateway_1 = require("./common/realtime-gateway/realtime.gateway");
const pipelinePromise = (0, node_util_1.promisify)(node_stream_1.pipeline);
const bootstrap = async () => {
    const port = config_1.PORT;
    const app = (0, express_1.default)();
    await (0, connection_1.connectDB)();
    await (0, redis_connection_1.connectRedis)();
    //middleware to get files
    app.get("/uploads/*paths", async (req, res, next) => {
        //assert it to string[]
        let key = req.params.paths.join("/");
        const fileExist = await init_1.default.getFile(key);
        if (!fileExist)
            throw new common_1.NotFoundException("File not found");
        //file is readStream and res is writeStream so we use pipeline
        await pipelinePromise(fileExist, res);
    });
    //middlewares
    app.use(express_1.default.json());
    app.use((0, cors_1.default)({ origin: "*" }));
    //graphql route
    app.all("/graphql", (0, express_2.createHandler)({
        context: (req) => {
            //set context
            const headers = req.headers;
            return {
                headers,
            };
        },
        schema: schema_gql_1.schema,
        formatError: (error) => {
            return {
                message: error.message,
                extensions: {
                    success: false,
                    statusCode: error.cause ?? 500,
                },
            };
        },
    }));
    // Serve the GraphiQL IDE.
    app.get("/", (_req, res) => {
        res.type("html");
        res.end((0, server_1.ruruHTML)({ endpoint: "/graphql" }));
    });
    //routes
    app.use("/auth", modules_1.authRouter);
    app.use("/post", modules_1.postRouter);
    app.use("/comment", modules_1.commentRouter);
    app.use("/request", modules_1.requestRouter);
    app.use("/user", modules_1.userRouter);
    //note: error handle must be the last middleware in the stack because it will catch any error thrown from previous middlewares or routes
    //global error handler middleware
    app.use((error, req, res, next) => {
        return res.status(error.cause || 500).json({
            success: false,
            message: error.message,
            // stack: error.stack,
            //we do this because global Error doesn't have details attribute
            details: error instanceof common_1.BadRequestException && error.details,
        });
    });
    const server = app.listen(port, () => console.log(`App is listen on port ${port}`));
    const realtimeGateway = new realtime_gateway_1.RealtimeGateway(server);
    const io = realtimeGateway.io;
};
exports.default = bootstrap;
