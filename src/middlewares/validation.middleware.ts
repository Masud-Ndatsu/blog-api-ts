import { NextFunction, Request, RequestHandler, Response } from "express";
import { validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";
import { HttpException } from "../exceptions/HttpException";
export const validationMiddleware = (
  type: any,
  skipMissingProperties: boolean = false
): RequestHandler => {
  return (req: Request, _: Response, next: NextFunction) => {
    validate(plainToClass(type, req.body), { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors
            .map((error: ValidationError) =>
              Object.values(error.constraints ?? {})
            )
            .join(", ");
          next(new HttpException(400, message));
        } else {
          next();
        }
      }
    );
  };
};
