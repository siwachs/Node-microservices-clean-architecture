import express, { Request, Response, NextFunction } from "express";

import { RequestAuthorizer } from "./middleware";
import * as service from "../services/order.service";
import { OrderRepository } from "../repository/order.repository";
import { CartRepository } from "../repository/cart.repository";

import { OrderStatus } from "../types";

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

router.get(
  "/order/:id",
  RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction) => {
    const orderId = parseInt(req.params.id);
    const status = req.body.status as OrderStatus;

    const response = await service.UpdateOrder(orderId, status, repo);
    return res.status(200).json(response);
  }
);

router.delete("/order/:id", async () => {});

router.get("/orders/:id/checkout", async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.id);
  const response = await service.CheckoutOrder(orderId, repo);
  return res.status(200).json(response);
});

export default router;
