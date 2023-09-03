import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';

const router = Router();

router.post(
  '/create-order',
  validateRequest(OrderValidation.createOrder),
  OrderController.createOrder
);

export const OrderRoutes = router;
