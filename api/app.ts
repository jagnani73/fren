import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { config as dotenvConfig } from "dotenv";
import cors from "cors";

import { errorHandler } from "./error/error.handler";
import authRoutes from "./auth/auth.routes";
import clientRoutes from "./client/client.routes";
import { DatabaseService } from "./services/database.service";

dotenvConfig();

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1", authRoutes);
app.use("/api/v1", clientRoutes);

app.use(errorHandler);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.url}`,
  });
});

Promise.all([DatabaseService.getInstance().initalize()])
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Server:${process.env.NODE_ENV}-mode in Port ${process.env.PORT}`
      );
    });
  })
  .catch((_) => {
    process.exit(1);
  });
