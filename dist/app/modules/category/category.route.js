"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = require("express");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const category_controller_1 = require("./category.controller");
const category_validation_1 = require("./category.validation");
const router = (0, express_1.Router)();
router.post('/create-category', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(category_validation_1.CategoryValidation.createCategory), category_controller_1.CategoryController.createCategory);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(category_validation_1.CategoryValidation.updateCategory), category_controller_1.CategoryController.updateCategory);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), category_controller_1.CategoryController.deleteCategory);
router.get('/', category_controller_1.CategoryController.getAllCategory);
router.get('/:id', category_controller_1.CategoryController.getSingleCategory);
exports.CategoryRoutes = router;
