"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCacheProvider = void 0;
const redis_1 = require("redis");
class RedisCacheProvider {
    client;
    constructor(config) {
        this.client = (0, redis_1.createClient)(config);
        this.client.connect().catch(err => console.log(err));
    }
    async del(key) {
        await this.client.del(key);
    }
    async get(key) {
        return await this.client.get(key);
    }
    async set(key, value, ttlSeconds) {
        if (ttlSeconds)
            await this.client.set(key, value, { EX: ttlSeconds });
        await this.client.set(key, value);
    }
    async addToSet(key, value) {
        await this.client.sAdd(key, value);
    }
    async rmSet(key, value) {
        const number = await this.client.sRem(key, value);
        return !!number;
    }
    async getAllFromSet(key) {
        return await this.client.sMembers(key);
    }
}
exports.RedisCacheProvider = RedisCacheProvider;
