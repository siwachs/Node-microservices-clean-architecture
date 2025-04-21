import { ICatalogRepository } from "../interface/catalogRepository.interface";

import { Product } from "../models/product.model";
import { ProductFactory } from "../utils/fixtures";

export class CatalogRepository implements ICatalogRepository {
  async create(data: Product): Promise<Product> {
    const product = ProductFactory.build();
    return Promise.resolve(product);
  }

  async update(data: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  async find(): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }

  async findOne(id: string): Promise<Product> {
    throw new Error("Method not implemented.");
  }
}
