import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import { BadRequestException } from "../common";

export const isValid = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    console.log(result.error?.issues[0])
    if (!result.success) {
      const errorMessages = result.error.issues.map((issue) => {
        return {
          message: issue.message,
          path: issue.path[0],
        };
      });
      throw new BadRequestException("validation error", errorMessages);
    }

    next();
  };
};
