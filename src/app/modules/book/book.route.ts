import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = Router();

router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.createBook),
  BookController.createBook
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.updateBook),
  BookController.updateBook
);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.deleteBook);
router.get('/', BookController.getAllBooks);
router.get('/:categoryId/category', BookController.getBooksByCategory);
router.get('/:id', BookController.getSingleBookById);

export const BookRoutes = router;
