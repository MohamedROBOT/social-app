"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_service_1 = require("./redis.service");
const config_1 = require("../../../config");
exports.default = new redis_service_1.RedisCacheProvider({
    url: config_1.DB_REDIS
});
