import { Router } from 'express';
import { AuthController } from './auth.controller';

const router = Router();

router.post('/signup', AuthController.signupUser);

export const AuthRoutes = router;
