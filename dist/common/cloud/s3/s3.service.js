"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3CloudProvider = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const config_1 = require("../../../config");
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
    async uploadFileV1(file, path) {
        //PutObjectCommand support to upload files up to 5 GB
        let command = new client_s3_1.PutObjectCommand({
            //add S3 credentials here import from .env
            Bucket: "bucket_name",
            //key of the file must be unique
            Key: `social-app/${path}/${Date.now()}_${file.originalname}`,
            ACL: "private",
            ContentType: file.mimetype,
            // Body: file.buffer
        });
        await this.client.send(command);
        return command.input.Key;
    }
    async uploadFileV2(file, path) {
        let command = new client_s3_1.PutObjectCommand({
            //add S3 credentials here import from .env
            Bucket: "bucket_name",
            //key of the file must be unique
            Key: `social-app/${path}/${Date.now()}_${file.originalname}`,
            ACL: "private",
            ContentType: file.mimetype,
            // Body: file.buffer
        });
        return await (0, s3_request_presigner_1.getSignedUrl)(this.client, command, { expiresIn: 5 * 60 });
    }
    async uploadFile(file, path) {
        //lib storage support large files as chunks and can track progress
        const upload = new lib_storage_1.Upload({
            client: this.client,
            params: {
                Bucket: config_1.BUCKET_NAME,
                Key: `social-app/${path}/${Date.now()}_${file.originalname}`,
                ACL: "private",
                ContentType: file.mimetype,
                Body: file.buffer
            }
        });
        //to track progress
        upload.on('httpUploadProgress', (progress) => {
            console.log(progress.loaded, progress.total);
            //useful with realtime (socket)
        });
        const { Key } = await upload.done();
        return Key;
    }
}
exports.S3CloudProvider = S3CloudProvider;
