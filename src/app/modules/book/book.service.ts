import { Book, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { bookSearchableFields } from './book.constants';
import { IFilterOptions } from './book.interface';

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

const getAllBooks = async (
  paginationFields: IPaginationOptions,
  filterFields: IFilterOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, size, sortBy, sortOrder, skip } =
    paginationHelper.calculatePagination(paginationFields);
  const { search, category, maxPrice, minPrice } = filterFields;

  const andConditions = [];
  const otherConditions = [];
  if (category) {
    otherConditions.push({
      categoryId: category as string,
    });
  }
  if (maxPrice && minPrice) {
    otherConditions.push({
      price: {
        gte: Number(minPrice),
        lte: Number(maxPrice),
      },
    });
  }

  if (maxPrice && !minPrice) {
    otherConditions.push({
      price: {
        lte: Number(maxPrice),
      },
    });
  }
  if (minPrice && !maxPrice) {
    otherConditions.push({
      price: {
        gte: Number(minPrice),
      },
    });
  }

  if (search) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }
  /* console.log(andConditions);
  console.log(otherConditions); */
  if (otherConditions.length > 0) {
    andConditions.push({
      AND: otherConditions,
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.book.count();
  const totalPage = Math.ceil(total / size);

  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    data: result,
  };
};

const getBooksByCategory = async (
  id: string,
  paginationFields: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, size, skip } =
    paginationHelper.calculatePagination(paginationFields);
  const result = await prisma.book.findMany({
    where: {
      categoryId: id,
    },
    take: size,
    skip,
  });
  const total = await prisma.book.count({
    where: {
      categoryId: id,
    },
  });
  const totalPage = Math.ceil(total / size);

  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    data: result,
  };
};

export const BookService = {
  createBook,
  updateBook,
  deleteBook,
  getSingleBookById,
  getAllBooks,
  getBooksByCategory,
};
