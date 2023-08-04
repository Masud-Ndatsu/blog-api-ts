import App from "./app";
import "dotenv/config";
import PostController from "./posts/posts.controller";
import AuthenticationController from "./authentication/authentication.controller";
import UserController from "./users/users.controller";
import ReportController from "./reports/reports.controller";

const app = new App(
  [
    new PostController(),
    new AuthenticationController(),
    new UserController(),
    new ReportController(),
  ],
  5000
);

app.listen();
