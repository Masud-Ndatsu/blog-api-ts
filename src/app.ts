import express from "express";
import mongoose from "mongoose";
import { Controller } from "./interfaces/controller.interface";
import { errorMiddleware } from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";
import { swaggerDocs } from "./docs/swagger";

class App {
  public app: express.Express;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;
    this.connectToDatabase();
    this.initializeMiddleware();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initializeMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller: Controller) => {
      this.app.use("/", controller.router);
    });
  }

  private async connectToDatabase() {
    try {
      const dbUri = process.env.MONGODB_URL ?? "";
      await mongoose.connect(dbUri);
      console.log("Database Connected");
    } catch (error: any) {
      console.log("DB ERROR: ", error);
    }
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on port: ${this.port}`);
      swaggerDocs(this.app, this.port);
    });
  }
}

export default App;
