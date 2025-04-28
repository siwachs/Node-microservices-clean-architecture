import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import CartRoutes from "./routes/cart.routes";
import OrderRoutes from "./routes/order.routes";
import { httpLogger, HandleErrorWithLogger } from "./utils";
import { InitializeBroker } from "./services/broker.service";

export const ExpressApp = async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(httpLogger);

  await InitializeBroker();

  app.use(CartRoutes);

  app.use(OrderRoutes);

  app.use("/health", (req: Request, res: Response, _: NextFunction) => {
    return res.status(200).json({ message: "Server is Up" });
  });

  app.use(HandleErrorWithLogger);

  return app;
};
