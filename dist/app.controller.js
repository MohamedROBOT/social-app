"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("./common");
const connection_1 = require("./DB/connection");
const modules_1 = require("./modules");
const redis_connection_1 = require("./DB/redis.connection");
const bootstrap = async () => {
    const port = 3000;
    const app = (0, express_1.default)();
    await (0, connection_1.connectDB)();
    await (0, redis_connection_1.connectRedis)();
    //middlwares
    app.use(express_1.default.json());
    app.use("/auth", modules_1.authRouter);
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
exports.bootstrap = bootstrap;
