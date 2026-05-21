//multer use busboy to parse the file
//file => file information => {filename?,destination?,originalname,mimetype,size,buffer?,encoding}
//after installing types it doesn't work because we have to add it manually

export interface ICloudProvider {
  //aws => s3 return Key (pascal case) which represents the path in cloud

  //basic cloud provider
  uploadFile(file: Express.Multer.File, path: string): Promise<{url:string, key:string}>; //key
  deleteFile(key: string): Promise<boolean | undefined>;
  getFile(key: string): Promise<NodeJS.ReadableStream | undefined>;




  //TODO: implement other cloud providers 1- cloudinary 2- Digital Ocean 3- azure
  //TODO: implement integration service
}

