import { HttpException } from "./HttpException";

export class AuthenticationTokenMissingException extends HttpException {
  constructor() {
    super(403, `Authentication token is required`);
  }
}
