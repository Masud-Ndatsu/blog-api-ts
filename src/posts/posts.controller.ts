import { NextFunction, Request, Response, Router } from "express";
import IPost from "./post.interface";
import postModel from "./post.model";
import { PostNotFoundException } from "../exceptions/PostException";
import { validationMiddleware } from "../middlewares/validation.middleware";
import CreatePostDto from "./post.dto";
import authMiddleware from "../middlewares/auth.middleware";
import { IRequestWithUser } from "../authentication/authentication.interface";

class PostController {
  public path: string = "/posts";
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:postId`, this.getPostById);

    this.router
      .all(`${this.path}/*`, authMiddleware)
      .put(
        `${this.path}/:postId`,
        validationMiddleware(CreatePostDto, true),
        this.editPostById
      )
      .delete(`${this.path}/:postId`, this.deletePostById)
      .post(
        this.path,
        authMiddleware,
        validationMiddleware(CreatePostDto),
        this.createAPost
      );
  }
  private createAPost = async (req: IRequestWithUser, res: Response) => {
    const post: IPost = req.body;
    const savedPost = await new postModel({
      ...post,
      author: req.user?._id,
    }).save();

    return res.status(201).json(savedPost);
  };
  private getAllPosts = async (_: Request, res: Response) => {
    const posts = await postModel.find({}).populate("author", "name").lean();
    return res.status(200).json(posts);
  };

  private getPostById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const postId = req.params.postId ?? "";
    const post = await postModel
      .findById(postId)
      .populate("author", "-password")
      .lean();
    if (post) {
      res.status(200).json(post);
    } else {
      next(new PostNotFoundException(postId));
    }
  };
  private editPostById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const postId = req.params.postId ?? "";
    const data = req.body;
    const post = await postModel
      .findByIdAndUpdate(postId, { ...data }, { new: true })
      .lean();
    if (post) {
      res.status(200).json(post);
    } else {
      next(new PostNotFoundException(postId));
    }
  };
  private deletePostById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const postId = req.params.postId ?? "";
    const post = await postModel.findByIdAndDelete(postId).lean();

    if (post) {
      res.status(200).json(post);
    } else {
      next(new PostNotFoundException(postId));
    }
  };
}

export default PostController;
