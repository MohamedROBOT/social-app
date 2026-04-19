import redisClient from "./redis.connection";

export const setIntoCache = async (
  key: string,
  value: string | number,
  expiryTime: number,
) => {
  await redisClient.set(key, value, {
    expiration: {
      type: "EX",
      //seconds
      value: expiryTime,
    },
  });
};
export const getFromCache = async (key: string) => {
  return await redisClient.get(key);
};


export const deleteFromCache = async (key:string) => {
  return await redisClient.del(key)
}