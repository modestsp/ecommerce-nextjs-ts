import { prisma } from '@/utils/db.server';
import { signJwt } from '@/utils/jwt.utils';
import { Session, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions, UserWithSession } from '@/lib/session';
import { useShopStore } from '@/lib/store';

const validatePassword = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  console.log('USER IN VALIDATE PASS', user);
  if (!user) {
    return false;
  }
  // Bcrypt compare
  const passwordCorrect = await bcrypt.compare(password, user.password);

  if (!passwordCorrect) {
    return false;
  }

  return user;
};

const createSession = async (userId: string) => {
  const session = await prisma.session.create({
    data: {
      userId,
    },
  });

  return session;
};

//tipear userWithSession

// const saveSession = async (
//   userWithSession: UserWithSession,
//   req: NextApiRequest
// ) => {
//   req.session.user = {
//     ...userWithSession,
//   };
//   await req.session.save();
// };

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  // const method = req.method?.toLowerCase();
  // if (method !== 'POST') {
  //   return res.status(405).end(`Method ${req.method} Not Allowed`);
  // }
  console.log('REQ BODY **ss*******', req.body);
  const { username, password } = await req.body;

  const user = await validatePassword({ username, password });

  if (!user) {
    return res.status(401).send({ error: 'Invalid username or password' });
  }
  // Create a session
  const session = await createSession(user.id);
  // await saveSession({ user, session }, req);
  req.session.user = { ...user, session, isLoggedIn: true };
  await req.session.save();
  // console.log('req in login', req.session);
  // return res.status(200).json({ user, session });
  // console.log('AASDASDAS', req.session.user);
  res.status(200).send(req.session.user);
}

// import { prisma } from '@/utils/db.server';
// import { signJwt } from '@/utils/jwt.utils';
// import { Session, User } from '@prisma/client';
// import bcrypt from 'bcrypt';
// import { serialize } from 'cookie';
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { withIronSessionApiRoute } from 'iron-session/next';
// import { sessionOptions, UserWithSession } from '@/utils/session';

// const validatePassword = async ({
//   username,
//   password,
// }: {
//   username: string;
//   password: string;
// }) => {
//   const user = await prisma.user.findUnique({
//     where: {
//       username,
//     },
//   });

//   if (!user) {
//     return false;
//   }
//   // Bcrypt compare
//   const passwordCorrect = await bcrypt.compare(password, user.password);

//   if (!passwordCorrect) {
//     return false;
//   }

//   return user;
// };

// const createSession = async (userId: string) => {
//   const session = await prisma.session.create({
//     data: {
//       userId,
//     },
//   });

//   return session;
// };

// //tipear userWithSession

// // const saveSession = async (
// //   userWithSession: UserWithSession,
// //   req: NextApiRequest
// // ) => {
// //   req.session.user = {
// //     ...userWithSession,
// //   };
// //   await req.session.save();
// // };

// export default withIronSessionApiRoute(loginRoute, sessionOptions);

// async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
//   // const method = req.method?.toLowerCase();
//   // if (method !== 'POST') {
//   //   return res.status(405).end(`Method ${req.method} Not Allowed`);
//   // }
//   const { username, password } = await JSON.parse(req.body);

//   console.log('REQ BODY **ss*******', req.body);
//   const user = await validatePassword({ username, password });

//   if (!user) {
//     return res.status(401).send({ error: 'Invalid username or password' });
//   }
//   // Create a session
//   const session = await createSession(user.id);
//   // await saveSession({ user, session }, req);
//   req.session.user = { user, session, isLoggedIn: true };
//   await req.session.save();
//   console.log('req in login', req.session);
//   // return res.status(200).json({ user, session });
//   res.json(req.session.user);

// }
