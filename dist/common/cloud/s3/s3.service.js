"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3CloudProvider = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const config_1 = require("../../../config");
const tsyringe_1 = require("tsyringe");
let S3CloudProvider = class S3CloudProvider {
    client;
    constructor() {
        this.client = new client_s3_1.S3Client({
            region: config_1.BUCKET_REGION,
            credentials: {
                accessKeyId: config_1.BUCKET_ACCESS_KEY_ID,
                secretAccessKey: config_1.BUCKET_SECRET_ACCESS_KEY,
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
};
exports.S3CloudProvider = S3CloudProvider;
exports.S3CloudProvider = S3CloudProvider = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], S3CloudProvider);
