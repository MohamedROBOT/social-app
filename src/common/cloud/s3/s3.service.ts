import {DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {ICloudProvider} from "../cloud.interface";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {Upload} from '@aws-sdk/lib-storage'
import {BUCKET_NAME} from "../../../config";

interface S3Config {
    region: string;
    credentials: {
        accessKeyId: string;
        secretAccessKey: string;
    };

}

export class S3CloudProvider implements ICloudProvider {
    private readonly client: S3Client;

    constructor(config: S3Config) {
        this.client = new S3Client({
            region: config.region,
            credentials: {
                accessKeyId: config.credentials.accessKeyId,
                secretAccessKey: config.credentials.secretAccessKey,
            },

        });
    }

    async deleteFile(key: string): Promise<boolean | undefined> {
        let command = new DeleteObjectCommand({
            Key: key,
            Bucket: "bucket_name from .env",

        })
        const {DeleteMarker} = await this.client.send(command);

        return DeleteMarker

    }

    async getFile(key: string): Promise<NodeJS.ReadableStream | undefined> {
        let command = new GetObjectCommand({
            Key: key,
            Bucket: "bucket_name from .env",
        })
        const {Body} = await this.client.send(command)

        return Body as NodeJS.ReadableStream
    }

//we handle files with busboy for parsing files & Multer for upload file into storage{diskStorage, memoryStorage}
    async uploadFileV1(file: Express.Multer.File, path: string): Promise<string> {
        //PutObjectCommand support to upload files up to 5 GB
        let command = new PutObjectCommand({
            //add S3 credentials here import from .env
            Bucket: "bucket_name",
            //key of the file must be unique
            Key: `social-app/${path}/${Date.now()}_${file.originalname}`,
            ACL: "private",
            ContentType: file.mimetype,
            // Body: file.buffer

        });
        await this.client.send(command)

        return command.input.Key as string
    }
    async uploadFileV2(file: Express.Multer.File, path: string): Promise<string> {

        let command = new PutObjectCommand({
            //add S3 credentials here import from .env
            Bucket: "bucket_name",
            //key of the file must be unique
            Key: `social-app/${path}/${Date.now()}_${file.originalname}`,
            ACL: "private",
            ContentType: file.mimetype,
            // Body: file.buffer

        });
       return await getSignedUrl(this.client, command, {expiresIn: 5*60})

    }
    async uploadFile(file: Express.Multer.File, path: string): Promise<string> {
       //lib storage support large files as chunks and can track progress
        const upload = new Upload({
           client: this.client,
           params: {
               Bucket: BUCKET_NAME,
               Key: `social-app/${path}/${Date.now()}_${file.originalname}`,
               ACL: "private",
               ContentType: file.mimetype,
               Body: file.buffer
           }
       })
        //to track progress
        upload.on('httpUploadProgress', (progress) => {
            console.log(progress.loaded, progress.total)
            //useful with realtime (socket)
        })
       const {Key} = await upload.done();
        return Key as string
    }
}
