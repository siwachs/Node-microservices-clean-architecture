import express, { NextFunction, Request, Response } from "express";
import { RequestAuthorizer } from "./middleware";
import * as service from "../service/payment.service";
import { PaymentGateway, StripePayment } from "../utils";

const router = express.Router();
const paymentGateway: PaymentGateway = StripePayment;

router.post(
  "/create-payment",
  RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      next(new Error("User not found"));
      return;
    }

    try {
      const { orderNumber } = req.body;

      const response = await service.CreatePayment(
        user.id,
        orderNumber,
        paymentGateway
      );

      res.status(200).json({ message: "Payment successful", data: response });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/verify-payment/:id",
  RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      next(new Error("User not found"));
      return;
    }

    const paymentId = req.params.id;
    if (!paymentId) {
      next(new Error("Payment ID not found"));
      return;
    }
    try {
      await service.VerifyPayment(paymentId, paymentGateway);
      res.status(200).json({ message: "Payment verification completed" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
