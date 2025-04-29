import { GetOrderDetails } from "../utils/broker/api";
import { PaymentGateway } from "../utils";
import { SendPaymentUpdateMessage } from "./broker.service";

export const CreatePayment = async (
  userId: number,
  orderId: number,
  paymentGateway: PaymentGateway
) => {
  // get order details from order service
  const order = await GetOrderDetails(orderId);
  if (order.customerId !== userId) {
    throw new Error("user not authorised to create payment");
  }

  const amountInCents = order.amount * 100;
  const orderMetaData = { orderId: order.orderNumber, userId };

  const paymentResponse = await paymentGateway.createPayment(
    amountInCents,
    orderMetaData
  );

  return {
    secret: paymentResponse.secret,
    pubKey: paymentResponse.pubKey,
    amount: amountInCents,
    order,
  };
};

export const VerifyPayment = async (
  paymentId: string,
  paymentGateway: PaymentGateway
) => {
  const paymentResponse = await paymentGateway.getPayment(paymentId);

  await SendPaymentUpdateMessage({
    status: paymentResponse.status,
    paymentLog: paymentResponse.paymentLog,
  });

  return {
    message: "Payment verified",
    status: paymentResponse.status,
    paymentLog: paymentResponse.paymentLog,
  };
};
