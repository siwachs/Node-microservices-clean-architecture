import {
  InProcessOrder,
  OrderLineItemType,
  OrderWithLineItems,
} from "../dto/orderRequest.dto";
import { CartRepositoryType } from "../repository/cart.repository";
import { OrderRepositoryType } from "../repository/order.repository";
import { MessageType, OrderStatus } from "../types";

export const CreateOrder = async (
  userId: number,
  repo: OrderRepositoryType,
  cartRepo: CartRepositoryType
) => {
  const cart = await cartRepo.findCart(userId);
  if (!cart) {
    throw new Error("Cart not found");
  }

  let cartTotal = 0;
  let orderLineItems: OrderLineItemType[] = [];

  cart.lineItems.forEach((item) => {
    cartTotal += item.qty * Number(item.price);
    orderLineItems.push({
      productId: item.productId,
      itemName: item.itemName,
      qty: item.qty,
      price: item.price,
    } as OrderLineItemType);
  });

  const orderNumber = Math.floor(Math.random() * 1000000);

  const orderInput: OrderWithLineItems = {
    orderNumber: orderNumber,
    txnId: null,
    status: OrderStatus.PENDING,
    customerId: userId,
    amount: cartTotal.toString(),
    orderItems: orderLineItems,
  };

  const order = await repo.createOrder(orderInput);
  await cartRepo.clearCartData(userId);
  console.log("Order created", order);

  // fire a message to subscription service [catalog service] to update stock
  // await repo.publishOrderEvent(order, "ORDER_CREATED");

  return { message: "Order created successfully", orderNumber: orderNumber };
};

export const UpdateOrder = async (
  orderId: number,
  status: OrderStatus,
  repo: OrderRepositoryType
) => {
  await repo.updateOrder(orderId, status);

  // fire a message to subscription service [catalog service] to update stock
  if (status === OrderStatus.CANCELLED) {
    // await repo.publishOrderEvent(order, "ORDER_CANCELLED");
  }
  return { message: "Order updated successfully" };
};

export const GetOrder = async (orderId: number, repo: OrderRepositoryType) => {
  const order = repo.findOrder(orderId);
  if (!order) {
    throw new Error("Order not found");
  }

  return order;
};

export const DeleteOrder = async (
  orderId: number,
  repo: OrderRepositoryType
) => {
  await repo.deleteOrder(orderId);
  return true;
};

export const HandleSubscription = async (message: MessageType) => {
  console.log("Message received by order Kafka consumer", message);
};

export const CheckoutOrder = async (
  orderId: number,
  repo: OrderRepositoryType
) => {
  const order = await repo.findOrder(orderId);
  if (!order) {
    throw new Error("Order not found");
  }

  const checkoutOrder: InProcessOrder = {
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    customerId: order.customerId,
    amount: Number(order.amount),
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };

  return checkoutOrder;
};
