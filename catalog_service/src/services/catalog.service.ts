import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { AppEventListener } from "../utils/ElasticSearchListener";

export class CatalogService {
  private _repository: ICatalogRepository;

  constructor(repository: ICatalogRepository) {
    this._repository = repository;
  }

  async createProduct(input: any) {
    const data = await this._repository.create(input);
    if (!data.id) throw new Error("Unable to create product");

    AppEventListener.getInstance().notify({
      event: "createProduct",
      data,
    });

    return data;
  }

  async updateProduct(input: any) {
    const data = await this._repository.update(input);
    if (!data.id) throw new Error("Product does not exist");

    AppEventListener.getInstance().notify({
      event: "updateProduct",
      data,
    });

    return data;
  }

  async getProducts(limit: number, offset: number) {
    const products = await this._repository.find(limit, offset);

    return products;
  }

  async getProduct(id: string) {
    const product = await this._repository.findOne(id);

    return product;
  }

  async deleteProduct(id: string) {
    const response = await this._repository.delete(id);
    if (!response) throw new Error("Unable to delete product");

    AppEventListener.getInstance().notify({
      event: "deleteProduct",
      data: { id },
    });

    return response;
  }

  async handleBrokerMessage(data: any) {}
}
