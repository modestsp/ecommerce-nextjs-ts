import { prisma } from '@/utils/db.server';
import { signJwt } from '@/utils/jwt.utils';
import bcrypt from 'bcrypt';
import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

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

export default async function createUserSessionHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('REQ BODY *********', req.body);
    const { username, password } = JSON.parse(req.body);
    const user = await validatePassword({ username, password });

    if (!user) {
      return res.status(401).send({ error: 'Invalid username or password' });
    }
    // Create a session
    const session = await createSession(user.id);
    // Create an access token
    const accessToken = signJwt(
      { ...user, session: session.id },
      { expiresIn: process.env.ACCESS_TOKEN_TTL } // 15minutes
    );

    // Create a refresh token
    const refreshToken = signJwt(
      { ...user, session: session.id },
      { expiresIn: process.env.REFRESH_TOKEN_TTL } // 1 year
    );
    // Return access and refresh tokens
    const accessTokenCookie = serialize('accessToken', accessToken, {
      maxAge: 3.154e10, // 1y
      httpOnly: true,
      path: '/',
      sameSite: 'none',
      secure: true,
    });

    const refreshTokenCookie = serialize('refreshToken', refreshToken, {
      maxAge: 3.154e10, // 1y
      httpOnly: true,
      path: '/',
      sameSite: 'none',
      secure: true,
    });
    res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

    return res.send({ accessToken, refreshToken });
  } catch (e) {
    console.log('ERROR', e);
  }
}
