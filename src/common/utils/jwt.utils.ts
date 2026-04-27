import  { JwtPayload, PrivateKey, sign, SignOptions, verify } from "jsonwebtoken";
import crypto from "node:crypto";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../../config";
import { IJwt } from "../interfaces";

const signToken = (payload: IJwt, secret: string, options?: SignOptions) => {
   payload.jti = crypto.randomUUID();
  return sign(payload, secret, options);
}

export const generateTokens = (payload: IJwt)=>{
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