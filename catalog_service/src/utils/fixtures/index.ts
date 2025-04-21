import { Product } from "../../models/product.model";

import { Factory } from "rosie";
import { faker } from "@faker-js/faker";

export const ProductFactory = new Factory<Product>()
  .attr("id", faker.string.alphanumeric())
  .attr("name", faker.commerce.productName())
  .attr("description", faker.commerce.productDescription())
  .attr("stock", faker.number.int({ min: 10, max: 1000 }))
  .attr("price", +faker.commerce.price());
