import express, { Request, Response } from "express";

import * as service from "../services/cart.service";
import * as repository from "../repository/cart.repository";

const router = express.Router();
const repo = repository.CartRepository;

router.post("/cart", async (req: Request, res: Response) => {
  const response = await service.CreateCart(req.body, repo);
  return res.status(201).json(response);
});

router.get("/cart", async (req: Request, res: Response) => {});

router.patch("/cart", async (req: Request, res: Response) => {});

router.delete("/cart", async (req: Request, res: Response) => {});

export default router;
