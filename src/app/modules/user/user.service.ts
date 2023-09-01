import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { removeFields } from '../../../shared/utils';

const getAllUsers = async (): Promise<Partial<User>[]> => {
  const result = await prisma.user.findMany({});

  const newResult = result.map(res => removeFields(res, ['password']));

  return newResult;
};

const getSingleUser = async (id: string): Promise<Partial<User | null>> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }
  const newResult = removeFields(result, ['password']);
  return newResult;
};

const updateUser = async (
  id: string,
  data: Partial<User>
): Promise<Partial<User | null>> => {
  const isExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: data,
  });

  const newResult = removeFields(result, ['password']);

  return newResult;
};

const deleteUser = async (id: string): Promise<Partial<User | null>> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }
  const newResult = removeFields(result, ['password']);
  return newResult;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
