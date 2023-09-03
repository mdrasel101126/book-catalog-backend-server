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
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../../enums/user");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createOrder = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.user.findUnique({ where: { id } });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const result = yield prisma_1.default.order.create({
        data: {
            userId: id,
            orderedBooks: payload.orderedBooks,
            status: payload.status,
            createdAt: payload.createdAt,
            updatedAt: payload.updatedAt,
        },
    });
    return result;
});
const getSingleOrder = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    if (user.role === user_1.ENUM_USER_ROLE.ADMIN) {
        result = yield prisma_1.default.order.findUnique({ where: { id } });
    }
    else {
        result = yield prisma_1.default.order.findUnique({
            where: {
                id,
                userId: user.id,
            },
        });
    }
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Order not found!');
    }
    return result;
});
exports.OrderService = { createOrder, getSingleOrder };
