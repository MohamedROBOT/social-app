import multer, {memoryStorage} from "multer";
//todo: why to use diskStorage insteadof memoryStorage

export const multerUploadFile = ()=>{
    return multer({storage: memoryStorage()})
}