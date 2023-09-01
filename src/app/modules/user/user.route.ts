import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = Router();

router.get('/', UserController.getAllUsers);
router.patch(
  '/:id',
  validateRequest(UserValidation.updateUser),
  UserController.updateUser
);
router.delete('/:id', UserController.deleteUser);
router.get('/:id', UserController.getSingleUser);

export const UserRoutes = router;
