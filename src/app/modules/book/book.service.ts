import { Book } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createBook = async (data: Book): Promise<Book> => {
  const isCategoryExist = await prisma.category.findUnique({
    where: {
      id: data?.categoryId,
    },
  });
  if (!isCategoryExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category Not Found!');
  }
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  const isExist = await prisma.book.findUnique({
    where: { id },
  });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book Not Found!');
  }
  const result = await prisma.book.update({
    where: { id },
    data: payload,
  });
  return result;
};
const deleteBook = async (id: string): Promise<Book> => {
  const isExist = await prisma.book.findUnique({
    where: { id },
  });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book Not Found!');
  }
  const result = await prisma.book.delete({
    where: { id },
  });
  return result;
};
const getSingleBookById = async (id: string): Promise<Book> => {
  const result = await prisma.book.findUnique({
    where: { id },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book Not Found!');
  }

  return result;
};

const getAllBooks = async (): Promise<Book[]> => {
  const result = await prisma.book.findMany({});

  return result;
};

export const BookService = {
  createBook,
  updateBook,
  deleteBook,
  getSingleBookById,
  getAllBooks,
};
