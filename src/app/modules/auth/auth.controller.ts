import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ISigninResponse } from './auth.interface';
import { AuthService } from './auth.service';

const signupUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.signupteUser(req.body);

  sendResponse<Partial<User>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  });
});

const signinUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.signinUser(req.body);
  sendResponse<ISigninResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User signin successfully!',
    token: result.token,
  });
});

export const AuthController = { signupUser, signinUser };
