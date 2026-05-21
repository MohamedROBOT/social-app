"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const common_1 = require("./common");
const connection_1 = require("./DB/connection");
const modules_1 = require("./modules");
const redis_connection_1 = require("./DB/redis.connection");
const init_1 = __importDefault(require("./common/cloud/s3/init"));
const node_stream_1 = require("node:stream");
const node_util_1 = require("node:util");
const cors_1 = __importDefault(require("cors"));
const express_2 = require("graphql-http/lib/use/express");
const type_1 = require("graphql/type");
const post_gql_1 = require("./modules/post/graphql/post.gql");
const user_gql_1 = require("./modules/user/graphql/user.gql");
const pipelinePromise = (0, node_util_1.promisify)(node_stream_1.pipeline);
const bootstrap = async () => {
    const port = 3000;
    const app = (0, express_1.default)();
    await (0, connection_1.connectDB)();
    await (0, redis_connection_1.connectRedis)();
    //middleware to get files
    app.get('/uploads/*paths', async (req, res, next) => {
        //assert it to string[]
        let key = req.params.paths.join('/');
        const fileExist = await init_1.default.getFile(key);
        if (!fileExist)
            throw new common_1.NotFoundException("File not found");
        //file is readStream and res is writeStream so we use pipeline
        await pipelinePromise(fileExist, res);
    });
    //middlewares
    let query = new type_1.GraphQLObjectType({
        name: "RootQuery",
        fields: {
            ...user_gql_1.userQuery,
            ...post_gql_1.postQuery
            // category: {
            //     type, resolve
            // },
            // review: {
            //     type, resolve
            // }
        }
    });
    let mutation = new type_1.GraphQLObjectType({
        name: "RootMutation",
        fields: {
            ...user_gql_1.userMutation,
            ...post_gql_1.postMutation
        }
    });
    let schema = new type_1.GraphQLSchema({
        query,
        mutation,
        //  subscription
    });
    app.all('/graphql', (0, express_2.createHandler)({ schema }));
    app.use(express_1.default.json());
    app.use((0, cors_1.default)({ origin: "*" }));
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
            stack: error.stack,
            //we do this because global Error doesn't have details attribute
            details: error instanceof common_1.BadRequestException && error.details,
        });
    });
    app.listen(port, () => console.log(`App is listen on port ${port}`));
};
exports.default = bootstrap;
