"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromCache = exports.getFromCache = exports.setIntoCache = void 0;
const redis_connection_1 = __importDefault(require("./redis.connection"));
const setIntoCache = async (key, value, expiryTime) => {
    await redis_connection_1.default.set(key, value, {
        expiration: {
            type: "EX",
            //seconds
            value: expiryTime,
        },
    });
};
exports.setIntoCache = setIntoCache;
const getFromCache = async (key) => {
    return await redis_connection_1.default.get(key);
};
exports.getFromCache = getFromCache;
const deleteFromCache = async (key) => {
    return await redis_connection_1.default.del(key);
};
exports.deleteFromCache = deleteFromCache;
