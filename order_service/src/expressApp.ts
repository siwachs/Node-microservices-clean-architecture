import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { Consumer, Producer } from "kafkajs";

import CartRoutes from "./routes/cart.routes";
import OrderRoutes from "./routes/order.routes";
import { httpLogger, HandleErrorWithLogger } from "./utils";
import { MessageBroker } from "./utils/broker";

export const ExpressApp = async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(httpLogger);

  // Connect Producer and Consumer
  const producer = await MessageBroker.connectProducer<Producer>();
  producer.on("producer.connect", () => {
    console.log("Producer connected");
  });

  const consumer = await MessageBroker.connectConsumer<Consumer>();
  consumer.on("consumer.connect", () => {
    console.log("Consumer connected");
  });

  // Subscribe to the topic or publish the message
  await MessageBroker.subscribe((message) => {
    console.log("Consumer received the message");
    console.log("Message is", message);
  }, "OrderEvents");

  app.use(CartRoutes);

  app.use(OrderRoutes);

  app.use("/health", (req: Request, res: Response, _: NextFunction) => {
    return res.status(200).json({ message: "Server is Up" });
  });

  app.use(HandleErrorWithLogger);

  return app;
};
