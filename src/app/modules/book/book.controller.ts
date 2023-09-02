import { Book } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationOptions } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookSearchableOptions } from './book.constants';
import { BookService } from './book.service';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.createBook(req.body);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.updateBook(req.params?.id, req.body);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.deleteBook(req.params?.id);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
    data: result,
  });
});
const getSingleBookById = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getSingleBookById(req.params?.id);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrived successfully',
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const paginationFields = pick(req.query, paginationOptions);
  const filterFields = pick(req.query, bookSearchableOptions);
  const result = await BookService.getAllBooks(paginationFields, filterFields);

  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrived successfully',
    meta: {
      page: result.meta.page,
      size: result.meta.size,
      total: result.meta.total,
      totalPage: result.meta.totalPage,
    },
    data: result.data,
  });
});

export const BookController = {
  createBook,
  updateBook,
  deleteBook,
  getSingleBookById,
  getAllBooks,
};
