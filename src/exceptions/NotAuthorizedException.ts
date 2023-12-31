import { HttpException } from "./HttpException";

export class NotAuthorizedException extends HttpException {
  constructor() {
    super(401, `user not authorized`);
  }
}
