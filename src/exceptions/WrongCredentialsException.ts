import { HttpException } from "./HttpException";

export class WrongCredentialsException extends HttpException {
  constructor() {
    super(403, `Invalid credentials`);
  }
}
