import * as z from "zod"
import { SignupDTO } from "./auth.dto";
import { generalFields, SYS_GENDER } from "../../common";
export const signupSchema = z.object({
    email: generalFields.email,
    password: generalFields.password,
    gender: generalFields.gender,
    phoneNumber: generalFields.phoneNumber,
    userName: generalFields.userName
})

export const loginSchema = {};

export const forgetPasswordSchema = {};

export const resetPasswordSchema = {};

export const changePasswordSchema = {};
