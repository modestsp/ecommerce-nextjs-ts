import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { prisma } from '@/utils/db.server';
import type { NextApiRequest, NextApiResponse } from 'next';

const createUser = async (input: any): Promise<User> => {
  const { username, email, name, password } = JSON.parse(input);
  console.log(typeof password);
  console.log('INPUT', input);
  const salt = 10;
  const passwordHash = await bcrypt.hash(password, salt);
  const newUser = await prisma.user.create({
    data: {
      username,
      name,
      email,
      password: passwordHash,
    },
  });
  console.log('NUEVO USER', newUser);
  return newUser;
};

export default async function createUserHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const body = req.body;
    const newUser = await createUser(body);
    // const safeUser = {username: newUser.username}
    console.log('NUEVO USER', newUser);
    return res.status(200).send(newUser);
  } catch (e) {
    console.log('error', e);
  }
}

// const createUserHandler = async (
//   req: NextApiRequest,
//   res: NextApiResponse
//   // next: NextFunction
// ) => {
//   try {
//     const user = await createUser(req.body);
//     // const safeUser = omit(user, 'password');
//     return res.status(201).send(user);
//   } catch (e: any) {
//     console.log('error', e);
//   }
// };
