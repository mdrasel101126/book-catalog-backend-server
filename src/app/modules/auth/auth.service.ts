import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { removeFields } from '../../../shared/utils';

import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { ISigninResponse } from './auth.interface';

const signupteUser = async (data: User): Promise<Partial<User>> => {
  const result = await prisma.user.create({
    data,
  });
  const newResult = removeFields(result, ['password']);
  return newResult;
};

const signinUser = async (
  payload: Pick<User, 'email' | 'password'>
): Promise<ISigninResponse> => {
  console.log(payload);
  const user = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  if (user.password != payload?.password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid password!');
  }
  const accessToken = jwtHelpers.createToken(
    { email: user.email, _id: user.id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  console.log(accessToken);
  return { token: accessToken };
};

/* const getProfile = async (id: string): Promise<IUser | null> => {
  const isUserExist = await User.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  return isUserExist;
}; */

export const AuthService = { signupteUser, signinUser };
