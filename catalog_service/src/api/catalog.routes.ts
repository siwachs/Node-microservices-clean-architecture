import express, { Request, Response, NextFunction } from "express";

import { CatalogService } from "../services/catalog.service";
import { CatalogRepository } from "../repository/catalog.repository";

import { RequestValidator } from "../utils/requestValidator";
import { CreateProductRequest, UpdateProductRequest } from "../dto/product.dto";

const router = express.Router();

export const catalogService = new CatalogService(new CatalogRepository());

router.post(
  "/product",
  async (req: Request, res: Response, next: NextFunction) => {
    const { errors, input } = await RequestValidator(
      CreateProductRequest,
      req.body
    );
    if (errors) return res.status(400).json(errors);

    const data = await catalogService.createProduct(req.body);

    return res.status(201).json(data);
  }
);

router.patch(
  "/product/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { errors, input } = await RequestValidator(
      UpdateProductRequest,
      req.body
    );
    if (errors) return res.status(400).json(errors);

    const id = req.params.id ?? "0";

    const data = await catalogService.updateProduct({ id, ...req.body });

    return res.status(200).json(data);
  }
);

router.get(
  "/products",
  async (req: Request, res: Response, next: NextFunction) => {
    const limit = Number(req.query["limit"]) || 25;
    const offset = Number(req.query["offset"]) || 0;

    const data = await catalogService.getProducts(limit, offset);

    return res.status(200).json(data);
  }
);

router.get(
  "/product/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id ?? "0";

    const data = await catalogService.getProduct(id);

    return res.status(200).json(data);
  }
);

router.delete(
  "/product/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id ?? "0";

    const data = await catalogService.deleteProduct(id);

    return res.status(200).json(data);
  }
);

export default router;
