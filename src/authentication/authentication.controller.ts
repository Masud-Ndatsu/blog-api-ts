import { NextFunction, Request, Response, Router } from "express";
import { Controller } from "../interfaces/controller.interface";
import CreateUserDto from "../users/user.dto";
import { validationMiddleware } from "../middlewares/validation.middleware";
import LogInDto from "./logIn.dto";
import AuthenticationService from "./authentication.service";
const authenticationService = new AuthenticationService();

class AuthenticationController implements Controller {
  public path: string = "/auth";
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(CreateUserDto),
      this.registration
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LogInDto),
      this.loggingIn
    );
    this.router.post(`${this.path}/logout`, this.logout);
  }

  private registration = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData: CreateUserDto = req.body;
      const { user, cookie, token } = await authenticationService.register(
        userData
      );
      res.setHeader("Set-Cookie", [cookie]);
      res.status(200).json({ user, token });
      return;
    } catch (error) {
      next(error);
    }
  };
  private loggingIn = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const logInData: LogInDto = req.body;
      const { user, cookie, token } = await authenticationService.login(
        logInData
      );
      res.setHeader("Set-Cookie", [cookie]);
      res.status(200).json({ user, token });
      return;
    } catch (error) {
      next(error);
    }
  };

  private logout = (_: Request, res: Response) => {
    res.setHeader("Set-Cookie", [`Authorization=;Max-Age=0`]);
    res.sendStatus(200);
  };
}

export default AuthenticationController;
