import {RedisCacheProvider} from "./redis.service";
import {DB_REDIS} from "../../../config";

export default new RedisCacheProvider({
    url: DB_REDIS
})