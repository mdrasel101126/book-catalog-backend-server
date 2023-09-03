import { Order } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  //console.log(req.body);
  const result = await OrderService.createOrder(req.user?.id, req.body);

  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});
const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  //console.log(req.body);
  const result = await OrderService.getSingleOrder(
    { id: req.user?.id, role: req.user?.role },
    req.params?.id
  );

  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

export const OrderController = { createOrder, getSingleOrder };
