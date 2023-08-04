import { Express, Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const port = process.env.PORT || 5000;
const baseUrl = process.env.BASE_URL;
const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      description: "The API documentation for Blog API",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${Number(port)}`,
        description: "Localhost (development)",
      },
      {
        url: baseUrl,
        description: "Production",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/docs/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app: Express, port: number) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  //   Docs in json format
  app.get("docs.json", (_: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`Docs is available at http://localhost:${port}/docs`);
};
