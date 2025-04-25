import axios from "axios";

import { logger } from "../logger";
import { AuthorizeError, NotFoundError } from "../error";

import { Product } from "../../dto/product.dto";
import { User } from "../../dto/user.modal";

const CATALOG_BASE_URL =
  process.env.CATALOG_BASE_URL || "http://localhost:8000";
const AUTH_SERVICE_BASE_URL =
  process.env.AUTH_SERVICE_BASE_URL || "http://localhost:9001";

export const GetProductDetails = async (productId: number) => {
  try {
    const response = await axios.get(
      `${CATALOG_BASE_URL}/products/${productId}`
    );

    return response.data as Product;
  } catch (error) {
    logger.error(error);
    throw new NotFoundError("product not found");
  }
};

export const ValidateUser = async (token: string) => {
  try {
    console.log("ValidateUser called", token);
    const response = await axios.get(`${AUTH_SERVICE_BASE_URL}/auth/validate`, {
      headers: {
        Authorization: token,
      },
    });

    console.log("response", response.data);

    if (response.status !== 200) {
      throw new AuthorizeError("user not authorised");
    }
    return response.data as User;
  } catch (error) {
    throw new AuthorizeError("user not authorised");
  }
};
