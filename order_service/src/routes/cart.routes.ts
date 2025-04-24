import express, { NextFunction, Request, Response } from "express";
import { ValidateRequest } from "../utils/validator";

import * as service from "../services/cart.service";
import * as repository from "../repository/cart.repository";

import { CartRequestInput, CartRequestSchema } from "../dto/cartRequest.dto";

const router = express.Router();
const repo = repository.CartRepository;

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const isValidUser = true;
  if (!isValidUser)
    return res.status(401).json({ error: "authorization error" });

  next();
};

router.use(authMiddleware);

router.post(
  "/cart",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const error = ValidateRequest<CartRequestInput>(
        req.body,
        CartRequestSchema
      );
      if (error) return res.json(404).json({ error });

      const response = await service.CreateCart(
        req.body as CartRequestInput,
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
