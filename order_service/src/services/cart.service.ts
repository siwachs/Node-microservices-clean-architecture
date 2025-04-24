import { CartLineItem } from "../db/schema";
import { CartRequestInput } from "../dto/cartRequest.dto";
import { CartRepositoryType } from "../repository/cart.repository";
import { NotFoundError } from "../utils";
import { GetProductDetails } from "../utils/broker";

export const CreateCart = async (
  input: CartRequestInput,
  repo: CartRepositoryType
) => {
  const product = await GetProductDetails(input.productId);
  if (product.stock < input.qty) throw new Error("Product out of stock");

  return await repo.createCart(input.customerId, {
    productId: product.id,
    price: product.price.toString(),
    qty: input.qty,
    itemName: product.name,
    variant: product.variant,
  } as CartLineItem);
};

export const GetCart = async (id: number, repo: CartRepositoryType) => {
  const data = await repo.findCart(id);
  if (!data) throw new NotFoundError("Cart not found");

  return data;
};

export const EditCart = async (
  input: CartRequestInput,
  repo: CartRepositoryType
) => {
  const data = await repo.updateCart(input.productId, input.qty);
  return data;
};

export const DeleteCart = async (input: any, repo: CartRepositoryType) => {
  const data = await repo.deleteCart(input);
  return data;
};
