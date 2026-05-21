import {DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {ICloudProvider} from "../cloud.interface";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

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
    async uploadFile(file: Express.Multer.File, path: string): Promise<{url:string, key:string}> {
        let command = new PutObjectCommand({
            //add S3 credentials here import from .env
            Bucket: "bucket_name",
            //key of the file must be unique
            Key: `social-app/${path}/${Date.now()}_${file.originalname}`,
            // ACL: "public-read",
            ContentType: file.mimetype,
            Body: file.buffer

        });
        await this.client.send(command)
        //pre-signer
       const url =   await getSignedUrl(this.client, command, {expiresIn:1800});
    return {
        url,
        key: command.input.Key as string
    }
        // return command.input.Key as string
    }
}
