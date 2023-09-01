import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const signupteUser = async (data: User): Promise<User> => {
  const result = await prisma.user.create({ data });
  return result;
};

export const AuthService = { signupteUser };
