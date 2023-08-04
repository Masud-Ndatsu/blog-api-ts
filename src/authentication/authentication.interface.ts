import { Request } from "express";
import { IUser } from "../users/user.interface";

export interface ITokenData {
  token: string;
  expiresIn: number;
}

export interface IDataStoredInToken {
  _id: string;
}

export interface IRequestWithUser extends Request {
  user?: IUser;
}
