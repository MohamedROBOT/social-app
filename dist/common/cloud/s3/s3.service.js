"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3CloudProvider = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
class S3CloudProvider {
    client;
    constructor(config) {
        this.client = new client_s3_1.S3Client({
            region: config.region,
            credentials: {
                accessKeyId: config.credentials.accessKeyId,
                secretAccessKey: config.credentials.secretAccessKey,
            },
        });
    }
    async deleteFile(key) {
        let command = new client_s3_1.DeleteObjectCommand({
            Key: key,
            Bucket: "bucket_name from .env",
        });
        const { DeleteMarker } = await this.client.send(command);
        return DeleteMarker;
    }
    async getFile(key) {
        let command = new client_s3_1.GetObjectCommand({
            Key: key,
            Bucket: "bucket_name from .env",
        });
        const { Body } = await this.client.send(command);
        return Body;
    }
    //we handle files with busboy for parsing files & Multer for upload file into storage{diskStorage, memoryStorage}
    async uploadFile(file, path) {
        let command = new client_s3_1.PutObjectCommand({
            //add S3 credentials here import from .env
            Bucket: "bucket_name",
            //key of the file must be unique
            Key: `social-app/${path}/${Date.now()}_${file.originalname}`,
            ACL: "public-read",
            ContentType: file.mimetype,
            Body: file.buffer
        });
        await this.client.send(command);
        return command.input.Key;
    }
}
exports.S3CloudProvider = S3CloudProvider;
