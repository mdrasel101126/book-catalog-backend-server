"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const auth_constants_1 = require("./auth.constants");
const signupUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        role: zod_1.z.enum(auth_constants_1.userRole, {
            required_error: 'Role is required',
        }),
        contactNo: zod_1.z.string({
            required_error: 'Contact Number is required',
        }),
        address: zod_1.z.string({
            required_error: 'Address is required',
        }),
        profileImg: zod_1.z.string({
            required_error: 'Image is required',
        }),
    }),
});
const signinUser = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
exports.AuthValidation = { signupUser, signinUser };
