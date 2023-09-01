import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = Router();

router.post(
  '/create-category',
  validateRequest(CategoryValidation.createCategory),
  CategoryController.createCategory
);
router.patch(
  '/:id',
  validateRequest(CategoryValidation.updateCategory),
  CategoryController.updateCategory
);
router.delete('/:id', CategoryController.deleteCategory);
router.get('/', CategoryController.getAllCategory);
router.get('/:id', CategoryController.getSingleCategory);

export const CategoryRoutes = router;
