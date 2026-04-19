import z from "zod"
import { SYS_GENDER } from "../enums"
export const generalFields = {
    email: z.email("must be a valid email address"),
    gender:z.enum(SYS_GENDER, {message: "gender must be male or female"}).optional(),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    userName: z.string("username must be a string").min(2).max(20),
    phoneNumber: z.string()
}