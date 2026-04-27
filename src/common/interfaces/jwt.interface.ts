import { Types } from "mongoose";

export interface IJwt {
    sub: Types.ObjectId,
    role: number,
    email: string,
    jti?: string
}