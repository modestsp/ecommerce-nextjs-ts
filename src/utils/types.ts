import { TypeOf } from 'zod';
import { createSessionSchema } from '@/pages/login';
import { createUserSchema } from '@/pages/signup';
import { createReviewSchema } from '@/components/Reviews';

export type CreateSessionInput = TypeOf<typeof createSessionSchema>;
export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type CreateReviewInput = TypeOf<typeof createReviewSchema>;

export interface User {
  id: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
  name: string;
  session: string;
}
