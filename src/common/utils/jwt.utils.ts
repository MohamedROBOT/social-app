import { JwtPayload, sign, SignOptions, verify } from "jsonwebtoken";
import crypto from "node:crypto";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../../config";
import { BadRequestException } from "./error.utils";

const signToken = (
  payload: JwtPayload,
  secret: string,
  options?: SignOptions,
) => {
  payload.jti = crypto.randomUUID();
  return sign(payload, secret, options);
};

export const generateTokens = (payload: JwtPayload) => {
  const accessToken = signToken(payload, JWT_ACCESS_SECRET, {
    expiresIn: "1d",
  });

  const refreshToken = signToken(payload, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return {
    tokens: {
      accessToken,
      refreshToken,
    },
  };
};

export const verifyToken = (authorization: string, secret: string) => {
  const token = authorization.split(" ")[1];
  if (!token) throw new BadRequestException("Token is required");
  return verify(token, secret);
};
