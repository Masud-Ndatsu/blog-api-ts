import { HttpException } from "./HttpException";

export class WrongAuthenticationTokenException extends HttpException {
  constructor() {
    super(402, `Invalid jwt token`);
  }
}
