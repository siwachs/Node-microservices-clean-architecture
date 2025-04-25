import express, { Request, Response, NextFunction } from "express";
import { MessageBroker } from "../utils";
import { OrderEvent } from "../types";

const router = express.Router();

router.post(
  "/order",
  async (req: Request, res: Response, next: NextFunction) => {
    // Create Order

    // Publish the message
    await MessageBroker.publish({
      topic: "OrderEvents",
      headers: { token: req.headers.authoriztion },
      event: OrderEvent.CREATE_ORDER,
      message: {
        orderId: 1,
        items: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 1 },
        ],
      },
    });

    return res.json(200).json({ message: "Order Created" });
  }
);

router.get("/order", async () => {});

router.get("/order/:id", async () => {});

router.delete("/order/:id", async () => {});

export default router;
