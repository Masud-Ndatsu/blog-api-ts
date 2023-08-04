import { HttpException } from "./HttpException";

export class UserWithThatEmailAlreadyExistsException extends HttpException {
  constructor() {
    super(409, `User with that email already exists`);
  }
}
