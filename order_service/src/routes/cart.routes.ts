import express, { NextFunction, Request, Response } from "express";
import { ValidateRequest } from "../utils/validator";
import { RequestAuthorizer } from "./middleware";

import * as service from "../services/cart.service";
import * as repository from "../repository/cart.repository";

import { CartRequestInput, CartRequestSchema } from "../dto/cartRequest.dto";

const router = express.Router();
const repo = repository.CartRepository;

router.post(
  "/cart",
  RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const error = ValidateRequest<CartRequestInput>(
        req.body,
        CartRequestSchema
      );
      if (error) return res.json(404).json({ error });

      const user = req.user;
      if (!user) return next(new Error("User not found"));

      const input: CartRequestInput = req.body;

      const response = await service.CreateCart(
        { ...input, customerId: user.id },
        repo
      );
      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/cart", async (req: Request, res: Response) => {});

router.patch("/cart/:lineItemId", async (req: Request, res: Response) => {});

router.delete("/cart/:lineItemId", async (req: Request, res: Response) => {});

export default router;
