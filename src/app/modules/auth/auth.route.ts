import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = Router();

router.post(
  '/signup',
  validateRequest(AuthValidation.signupUser),
  AuthController.signupUser
);
router.post(
  '/signin',
  validateRequest(AuthValidation.signinUser),
  AuthController.signinUser
);

export const AuthRoutes = router;
