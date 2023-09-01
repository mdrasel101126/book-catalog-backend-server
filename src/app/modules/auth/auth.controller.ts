import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const signupUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.signupteUser(req.body);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  });
});

export const AuthController = { signupUser };
