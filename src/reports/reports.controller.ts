import { Request, Response, Router } from "express";
import { Controller } from "../interfaces/controller.interface";
import userModel from "../users/user.model";

class ReportController implements Controller {
  public path: string = "/reports";
  public router: Router = Router();
  public user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(this.path, this.generateReport);
  }

  private generateReport = async (req: Request, res: Response) => {
    const userByCity = await this.user.aggregate([
      {
        $match: {
          email: req.query.email,
        },
      },
      {
        $project: {
          _id: 0,
          email: 1,
          name: 1,
          address: { city: 1 },
        },
      },
      {
        $group: {
          _id: {
            city: "$address.city",
            name: "$name",
          },
          total: { $sum: 1 },
        },
      },
    ]);

    return res.status(200).json(userByCity);
  };
}

export default ReportController;
