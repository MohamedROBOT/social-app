import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import { BadRequestException } from "../common";

export const isValid = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
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


export const isValidGQL = async (schema: ZodObject, args: unknown) => {
  const result = await schema.safeParseAsync(args);
  if (!result.success) {
    const errorMessages = result.error.issues.map((issue) => {
      return {
        message: issue.message,
        path: issue.path[0] as string,
      };
    });
    throw new BadRequestException("validation error", errorMessages);
  }
};
