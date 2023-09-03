import { Order, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
const createOrder = async (id: string, payload: Order): Promise<Order> => {
  const isExist = await prisma.user.findUnique({ where: { id } });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await prisma.order.create({
    data: {
      userId: id,
      orderedBooks: payload.orderedBooks as Prisma.JsonArray,
      status: payload.status,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
    },
  });

  return result;
};

const getSingleOrder = async (
  user: { id: string; role: string },
  id: string
): Promise<Order | null> => {
  let result = null;
  if (user.role === ENUM_USER_ROLE.ADMIN) {
    result = await prisma.order.findUnique({ where: { id } });
  } else {
    result = await prisma.order.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });
  }

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found!');
  }

  return result;
};

export const OrderService = { createOrder, getSingleOrder };
