import { Order, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
const createOrder = async (payload: Order): Promise<Order> => {
  //const orderBooks = payload?.orderBooks;
  console.log(payload);
  const result = await prisma.order.create({
    data: {
      userId: payload.userId,
      orderedBooks: payload.orderedBooks as Prisma.JsonArray,
      status: payload.status,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
    },
  });

  return result;
};

export const OrderService = { createOrder };
