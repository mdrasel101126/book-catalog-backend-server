import { Category } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createCategory = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};
const updateCategory = async (
  id: string,
  payload: Partial<Category>
): Promise<Category> => {
  const isExist = await prisma.category.findUnique({ where: { id } });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not Found!');
  }
  const result = await prisma.category.update({
    where: { id },
    data: payload,
  });
  return result;
};
const deleteCategory = async (id: string): Promise<Category> => {
  const isExist = await prisma.category.findUnique({ where: { id } });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not Found!');
  }
  const result = await prisma.category.delete({
    where: { id },
  });
  return result;
};
const getSingleCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({ where: { id } });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not Found!');
  }

  return result;
};
const getAllCategory = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany();

  return result;
};

export const CategoryService = {
  createCategory,
  updateCategory,
  deleteCategory,
  getSingleCategory,
  getAllCategory,
};
