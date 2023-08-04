import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import { IRequestWithUser } from "../authentication/authentication.interface";
import userModel from "../users/user.model";
import { WrongAuthenticationTokenException } from "../exceptions/WrongAuthenticationTokenException";
import { AuthenticationTokenMissingException } from "../exceptions/AuthenticationTokenMissingException";

const authMiddleware = async (
  req: IRequestWithUser,
  _: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;
  if ((cookies && cookies.Authorization) || req?.headers?.authorization) {
    try {
      const token = req?.headers?.authorization?.split(" ")[1];
      const secret = process.env.SECRET_KEY ?? "";
      const verifiedResponse = jwt.verify(
        cookies.Authorization ?? token,
        secret
      ) as jwt.JwtPayload;
      const id = verifiedResponse._id;
      const user = await userModel.findById(id);

      if (user) {
        req.user = user;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
};

export default authMiddleware;
