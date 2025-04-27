import express, { Request, Response, NextFunction } from "express";

import { RequestAuthorizer } from "./middleware";
import * as service from "../services/order.service";
import { OrderRepository } from "../repository/order.repository";
import { CartRepository } from "../repository/cart.repository";

const router = express.Router();
const repo = OrderRepository;
const cartRepo = CartRepository;

router.post(
  "/order",
  RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) return next("User not found");

    const response = await service.CreateOrder(user.id, repo, cartRepo);
    return res.status(200).json(response);
  }
);

router.get("/order", async () => {});

router.get("/order/:id", async () => {});

router.delete("/order/:id", async () => {});

export default router;
