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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const utils_1 = require("../../../shared/utils");
const signupteUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.create({
        data,
    });
    const newResult = (0, utils_1.removeFields)(result, ['password']);
    return newResult;
});
const signinUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(payload);
    const user = yield prisma_1.default.user.findFirst({
        where: {
            email: payload.email,
        },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    if (user.password != (payload === null || payload === void 0 ? void 0 : payload.password)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid password!');
    }
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ id: user.id, role: user.role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    // console.log(accessToken);
    return { token: accessToken };
});
exports.AuthService = { signupteUser, signinUser };
