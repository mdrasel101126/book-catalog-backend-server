import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = Router();

router.post(
  '/create-book',
  validateRequest(BookValidation.createBook),
  BookController.createBook
);
router.patch(
  '/:id',
  validateRequest(BookValidation.updateBook),
  BookController.updateBook
);
router.delete('/:id', BookController.deleteBook);
router.get('/', BookController.getAllBooks);
router.get('/:categoryId/category', BookController.getBooksByCategory);
router.get('/:id', BookController.getSingleBookById);

export const BookRoutes = router;
