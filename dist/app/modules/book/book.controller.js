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
exports.BookController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const book_constants_1 = require("./book.constants");
const book_service_1 = require("./book.service");
const createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.BookService.createBook(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book created successfully',
        data: result,
    });
}));
const updateBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield book_service_1.BookService.updateBook((_a = req.params) === null || _a === void 0 ? void 0 : _a.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book updated successfully',
        data: result,
    });
}));
const deleteBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const result = yield book_service_1.BookService.deleteBook((_b = req.params) === null || _b === void 0 ? void 0 : _b.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book deleted successfully',
        data: result,
    });
}));
const getSingleBookById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const result = yield book_service_1.BookService.getSingleBookById((_c = req.params) === null || _c === void 0 ? void 0 : _c.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book retrived successfully',
        data: result,
    });
}));
const getAllBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationFields = (0, pick_1.default)(req.query, pagination_1.paginationOptions);
    const filterFields = (0, pick_1.default)(req.query, book_constants_1.bookSearchableOptions);
    const result = yield book_service_1.BookService.getAllBooks(paginationFields, filterFields);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
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
}));
const getBooksByCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const paginationFields = (0, pick_1.default)(req.query, pagination_1.paginationOptions);
    const result = yield book_service_1.BookService.getBooksByCategory((_d = req.params) === null || _d === void 0 ? void 0 : _d.categoryId, paginationFields);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Books with associated category data fetched successfully',
        meta: {
            page: result.meta.page,
            size: result.meta.size,
            total: result.meta.total,
            totalPage: result.meta.totalPage,
        },
        data: result.data,
    });
}));
exports.BookController = {
    createBook,
    updateBook,
    deleteBook,
    getSingleBookById,
    getAllBooks,
    getBooksByCategory,
};
