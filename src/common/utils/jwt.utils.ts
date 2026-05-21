import  { JwtPayload,  sign, SignOptions, verify } from "jsonwebtoken";
import crypto from "node:crypto";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../../config";


const signToken = (payload: JwtPayload, secret: string, options?: SignOptions) => {
   payload.jti = crypto.randomUUID();
  return sign(payload, secret, options);
}

export const generateTokens = (payload: JwtPayload)=>{
    const accessToken = signToken(payload, JWT_ACCESS_SECRET, {
        expiresIn: "1h"
    })


    const refreshToken = signToken(payload, JWT_REFRESH_SECRET, {
        expiresIn: "1y"
    })


    return {
        tokens: {
            accessToken,
            refreshToken
        }
    }
}

export const verifyToken = (authorization: string, secret: string) => {
return verify(authorization, secret);
}