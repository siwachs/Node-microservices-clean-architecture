import { ICatalogRepository } from "../interface/catalogRepository.interface";

import { Product } from "../models/product.model";

export class MockCatalogRepository implements ICatalogRepository {
  create(data: Product): Promise<Product> {
    const mockProduct = { id: "Random UUID", ...data } as Product;

    return Promise.resolve(mockProduct);
  }

  update(data: Product): Promise<Product> {
    return Promise.resolve(data as unknown as Product);
  }

  delete(id: string): Promise<string> {
    return Promise.resolve(id);
  }

  find(limit: number, offset: number): Promise<Product[]> {
    return Promise.resolve([]);
  }

  findOne(id: string): Promise<Product> {
    return Promise.resolve({} as unknown as Product);
  }
}
