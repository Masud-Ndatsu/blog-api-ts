import { NextFunction, Response, Router } from "express";
import { Controller } from "../interfaces/controller.interface";
import userModel from "./user.model";
import { IRequestWithUser } from "../authentication/authentication.interface";
import postModel from "../posts/post.model";
import authMiddleware from "../middlewares/auth.middleware";
import { NotAuthorizedException } from "../exceptions/NotAuthorizedException";
class UserController implements Controller {
  public path: string = "/users";
  public router: Router = Router();
  public user = userModel;
  public post = postModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/:userId/posts`,
      authMiddleware,
      this.getAllPostsByUser
    );
  }

  private getAllPostsByUser = async (
    req: IRequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId = req.params.userId;
    if (userId === req.user?._id.toString()) {
      const posts = await this.post.find({ author: userId });

      res.status(200).json({ posts });
      return;
    }
    next(new NotAuthorizedException());
  };
}

export default UserController;
