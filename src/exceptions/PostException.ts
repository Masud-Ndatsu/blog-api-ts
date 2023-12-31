import { HttpException } from "./HttpException";

export class PostNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Post with ${id} not found`);
  }
}
