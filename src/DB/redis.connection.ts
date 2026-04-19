import { createClient } from "redis";
import { DB_REDIS } from "../config";

const redisClient = createClient({
  url: DB_REDIS,
});

export const connectRedis = async () => {
  await redisClient
    .connect()
    .then(() => {
      console.log("redis connected successfully");
    })
    .catch((err) => {
      console.log("failed to connect redis", err);
    });
};

export default redisClient;