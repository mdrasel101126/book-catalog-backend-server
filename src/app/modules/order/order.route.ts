import { Router } from 'express';
import { OrderController } from './order.controller';

const router = Router();

router.post('/create-order', OrderController.createOrder);

export const OrderRoutes = router;
