import {NextFunction, Request, Response, Router} from "express"
import {multerUploadFile} from "../../common";
import userService from "./user.service";
import {Types} from "mongoose"


const router = Router();
//upload profile picture
router.post("/profile-pic",
    //auth
    multerUploadFile().single("profile-pic"),
    async (req: Request, res: Response, next: NextFunction) => {
         await userService.uploadProfilePic(req.file as Express.Multer.File, new Types.ObjectId("69dfad1d0be24b44e159fa94"))
        return res.status(200).json({
            success: true,
            message: "Profile picture uploaded successfully",

        })
    }
)
export default router