import { Static, Type } from "@sinclair/typebox";

export const CartRequestSchema = Type.Object({
  customerId: Type.Number(),
  productId: Type.Integer(),
  qty: Type.Integer(),
});

export type CartRequestInput = Static<typeof CartRequestSchema>;

export const EditCartRequestSchema = Type.Object({
  productId: Type.Optional(Type.Integer()),
  qty: Type.Optional(Type.Integer()),
});

export type CartEditRequestInput = Static<typeof EditCartRequestSchema>;
