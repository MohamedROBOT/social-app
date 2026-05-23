"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const s3_service_1 = require("./s3.service");
const config_1 = require("../../../config");
exports.default = new s3_service_1.S3CloudProvider({
    region: config_1.BUCKET_REGION,
    credentials: {
        accessKeyId: config_1.BUCKET_ACCESS_KEY_ID,
        secretAccessKey: config_1.BUCKET_SECRET_ACCESS_KEY,
    },
});
