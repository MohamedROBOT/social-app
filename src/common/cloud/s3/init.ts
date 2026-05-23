import { S3CloudProvider } from "./s3.service";
import {BUCKET_ACCESS_KEY_ID, BUCKET_REGION, BUCKET_SECRET_ACCESS_KEY} from "../../../config";
export default new S3CloudProvider({
  region: BUCKET_REGION,
  credentials: {
    accessKeyId: BUCKET_ACCESS_KEY_ID,
    secretAccessKey: BUCKET_SECRET_ACCESS_KEY,
  },

});
