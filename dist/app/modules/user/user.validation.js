"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const auth_constants_1 = require("../auth/auth.constants");
const updateUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        role: zod_1.z.enum(auth_constants_1.userRole).optional(),
        contactNo: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        profileImg: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = { updateUser };
