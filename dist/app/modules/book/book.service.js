"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const book_constants_1 = require("./book.constants");
const createBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isCategoryExist = yield prisma_1.default.category.findUnique({
        where: {
            id: data === null || data === void 0 ? void 0 : data.categoryId,
        },
    });
    if (!isCategoryExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Category Not Found!');
    }
    const result = yield prisma_1.default.book.create({
        data,
        include: {
            category: true,
        },
    });
    return result;
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.book.findUnique({
        where: { id },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book Not Found!');
    }
    const result = yield prisma_1.default.book.update({
        where: { id },
        data: payload,
    });
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.book.findUnique({
        where: { id },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book Not Found!');
    }
    const result = yield prisma_1.default.book.delete({
        where: { id },
    });
    return result;
});
const getSingleBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findUnique({
        where: { id },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book Not Found!');
    }
    return result;
});
const getAllBooks = (paginationFields, filterFields) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, sortBy, sortOrder, skip } = paginationHelper_1.paginationHelper.calculatePagination(paginationFields);
    const { search, category, maxPrice, minPrice } = filterFields;
    const andConditions = [];
    const otherConditions = [];
    if (category) {
        otherConditions.push({
            categoryId: category,
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
            OR: book_constants_1.bookSearchableFields.map(field => ({
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
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.book.findMany({
        where: whereConditions,
        skip,
        take: size,
        orderBy: sortBy && sortOrder
            ? {
                [sortBy]: sortOrder,
            }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.book.count();
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
});
const getBooksByCategory = (id, paginationFields) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, skip } = paginationHelper_1.paginationHelper.calculatePagination(paginationFields);
    const result = yield prisma_1.default.book.findMany({
        where: {
            categoryId: id,
        },
        take: size,
        skip,
    });
    const total = yield prisma_1.default.book.count({
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
});
exports.BookService = {
    createBook,
    updateBook,
    deleteBook,
    getSingleBookById,
    getAllBooks,
    getBooksByCategory,
};
