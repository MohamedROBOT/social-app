import { S3CloudProvider } from "./s3.service";

export default new S3CloudProvider({
  region: "eu-west",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});
