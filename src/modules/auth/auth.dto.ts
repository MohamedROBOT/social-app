//DTO >> data transfer object

import z from "zod";
import { signupSchema } from "./auth.validation";

// export interface SignupDTO {
//   email: string;
//   password: string;
//   userName: string;
//   phoneNumber?: string;
//   gender: SYS_GENDER;
// }


//make type dto out of zod schema
export type SignupDTO = z.infer<typeof signupSchema>

export interface VerifyAccountDTO {
  otp: string;
  email: string;
}
export interface SendOtpDTO {
  email: string
}
export interface LoginDTO {
  email: string;
  password: string;
}



export interface ResetPasswordDTO {
  email: string;
  otp: string;
  password: string;
}

export interface ChangePasswordDTO {
  email: string;
  oldPassword: string;
  newPassword: string;
}