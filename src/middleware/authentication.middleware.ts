import type { Response, NextFunction, Request } from "express";
import { BadRequestException, verifyToken } from "../common";
import { JWT_ACCESS_SECRET } from "../config";
import { JwtPayload } from "jsonwebtoken";

export const isAuthenticated =async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization as string;
  if(!authorization) throw new BadRequestException("token is required");
  const payload = verifyToken(authorization, JWT_ACCESS_SECRET) as JwtPayload; //throw error internally from jwt
  req.user = payload
  next();
};

export const isAuthGQL =async (context: any): Promise<void> => {
  const authorization = context.headers.authorization;
  const payload = verifyToken(authorization, JWT_ACCESS_SECRET) as JwtPayload; //throw error internally from jwt
  
  context.user = payload;
};
