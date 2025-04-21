import { ICatalogRepository } from "../../interface/catalogRepository.interface";
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";

import { Product } from "../../models/product.model";

import { ProductFactory } from "../../utils/fixtures";
import { CatalogService } from "../catalog.service";
import { faker } from "@faker-js/faker";

const mockProduct = (rest?: any) => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 10, max: 1000 }),
    price: +faker.commerce.price(),
    ...rest,
  };
};

describe("catalogService", () => {
  let repository: ICatalogRepository;

  beforeEach(() => {
    repository = new MockCatalogRepository();
  });

  describe("createProduct", () => {
    test("should create product", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct();

      const result = await service.createProduct(reqBody);

      expect(result).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        stock: expect.any(Number),
      });
    });

    test("should throw error when unable to create product", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct();

      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() => Promise.resolve({} as Product));

      await expect(service.createProduct(reqBody)).rejects.toThrow(
        "Unable to create product"
      );
    });

    test("should throw error when product already exist", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct();

      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("Product already exist"))
        );

      await expect(service.createProduct(reqBody)).rejects.toThrow(
        "Product already exist"
      );
    });
  });

  describe("updateProduct", () => {
    test("should update product", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct({
        id: faker.number.int({ min: 10, max: 1000 }),
      });

      const result = await service.updateProduct(reqBody);

      expect(result).toMatchObject(reqBody);
    });

    test("should throw error when product does not exist", async () => {
      const service = new CatalogService(repository);

      jest
        .spyOn(repository, "update")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("Product does not exist"))
        );

      await expect(service.updateProduct({})).rejects.toThrow(
        "Product does not exist"
      );
    });
  });

  describe("getProducts", () => {
    test("should get products by offset and limit", async () => {
      const service = new CatalogService(repository);
      const randomLimit = faker.number.int({ min: 10, max: 100 });
      const products = ProductFactory.buildList(randomLimit);

      jest
        .spyOn(repository, "find")
        .mockImplementationOnce(() => Promise.resolve(products));

      const result = await service.getProducts(randomLimit, 0);

      expect(result.length).toEqual(randomLimit);
      expect(result).toMatchObject(products);
    });
  });

  afterEach(() => {
    repository = {} as MockCatalogRepository;
  });
});
