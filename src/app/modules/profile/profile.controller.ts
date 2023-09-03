import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const myProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.myProfile(req.user?.id);
  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information retrieved successfully",
    data: result,
  });
});

export const ProfileController = { myProfile };
