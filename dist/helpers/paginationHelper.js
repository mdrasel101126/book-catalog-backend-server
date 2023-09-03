"use strict";
/* type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};

const calculatePagination = (options: IOptions): IOptionsResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelpers = {
  calculatePagination,
}; */
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelper = void 0;
const calculatePagination = (options) => {
    const page = Number((options === null || options === void 0 ? void 0 : options.page) || 1);
    const size = Number(options.size || 10);
    const skip = (page - 1) * size;
    const sortOrder = options.sortOrder || 'desc';
    const sortBy = options.sortBy || 'createdAt';
    return {
        page,
        size,
        skip,
        sortOrder,
        sortBy,
    };
};
exports.paginationHelper = { calculatePagination };
