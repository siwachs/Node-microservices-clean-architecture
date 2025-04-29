import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import paymentRoutes from "./routes/payment.routes";
import { httpLogger, HandleErrorWithLogger } from "./utils";
import { InitializeBroker } from "./service/broker.service";

export const ExpressApp = async () => {
  const app = express();
  app.use(cors({ origin: "*" }));
  app.use(express.json());
  app.use(httpLogger);

  await InitializeBroker();

  app.use(paymentRoutes);

  app.use("/", (req: Request, res: Response, _: NextFunction) => {
    res.status(200).json({ message: "I am healthy!" });
  });

  app.use(HandleErrorWithLogger);

  return app;
};
