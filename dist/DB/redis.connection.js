"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRedis = void 0;
const redis_1 = require("redis");
const config_1 = require("../config");
const redisClient = (0, redis_1.createClient)({
    url: config_1.DB_REDIS,
});
const connectRedis = async () => {
    await redisClient
        .connect()
        .then(() => {
        console.log("redis connected successfully");
    })
        .catch((err) => {
        console.log("failed to connect redis", err);
    });
};
exports.connectRedis = connectRedis;
exports.default = redisClient;
