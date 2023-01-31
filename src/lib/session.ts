import type { IronSessionOptions } from 'iron-session';
import type { User } from '@prisma/client';
import type { Session } from '@prisma/client';

export interface UserWithSession extends User {
  session: Session;
  isLoggedIn: boolean;
}

export const sessionOptions: IronSessionOptions = {
  cookieName: 'my-session',
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieOptions: {
    secure: false,
  },
};

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    user?: UserWithSession;
  }
}
