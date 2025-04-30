import { Client } from "@elastic/elasticsearch";
import { EventPayload } from "../utils/ElasticSearchListener";
import { CatalogProduct } from "../dto/payload.dto";

export class ElasticSearchService {
  private indexName = "product";
  private client: Client;

  constructor() {
    this.client = new Client({
      node: process.env.ELASTICSEARCH_URL || "http://localhost:9200",
    });

    this.createIndex();
  }

  async handleEvents({ event, data }: EventPayload) {
    switch (event) {
      case "createProduct":
        await this.createProduct(data as CatalogProduct);
        break;
      case "updateProduct":
        await this.updateProduct(data as CatalogProduct);
        break;
      case "deleteProduct":
        await this.deleteProduct((data as CatalogProduct).id);
        break;
    }
  }

  async createIndex() {
    const indexExists = await this.client.indices.exists({
      index: this.indexName,
    });

    if (indexExists) return;

    await this.client.indices.create({
      index: this.indexName,
      body: {
        mappings: {
          properties: {
            id: { type: "keyword" },
            title: { type: "text" },
            description: { type: "text" },
            price: { type: "float" },
            stock: { type: "integer" },
          },
        },
      } as any,
    });
  }

  async getProducts(id: string) {
    const result = await this.client.get({
      index: this.indexName,
      id,
    });

    return result._source;
  }

  async createProduct(data: CatalogProduct) {
    await this.client.index({
      index: this.indexName,
      id: data.id.toString(),
      document: data,
    });

    console.log("Product created with id", data.id);
  }

  async updateProduct(data: CatalogProduct) {
    await this.client.update({
      index: this.indexName,
      id: data.id.toString(),
      doc: data,
    });

    console.log("Product updated with id", data.id);
  }

  async deleteProduct(id: number) {
    await this.client.delete({
      index: this.indexName,
      id: id.toString(),
    });

    console.log("Product deleted with id", id);
  }

  async searchProduct(query: string) {
    const result = await this.client.search({
      index: this.indexName,
      query: {
        multi_match: {
          query,
          fields: ["title", "description"],
          fuzziness: "AUTO",
        },
      },
    });

    return result.hits.hits.map((hit) => hit._source);
  }
}
