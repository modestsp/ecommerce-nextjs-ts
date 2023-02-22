import { TypeOf } from 'zod';
import { createSessionSchema } from '@/pages/login';
import { createUserSchema } from '@/pages/signup';
import { createTodoSchema } from './components/Home/Main/Todos/CreateTodoForm';
import { createProjectSchema } from './components/Home/Main/Projects/CreateProjectForm';
import { updateTodoSchema } from './components/Home/Main/Todos/UpdateTodo';
import { updateProjectSchema } from './components/Home/Main/Projects/UpdateProjectForm';

export type CreateSessionInput = TypeOf<typeof createSessionSchema>;
export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type CreateTodoInput = TypeOf<typeof createTodoSchema>;
export type CreateProjectInput = TypeOf<typeof createProjectSchema>;
export type UpdateTodoInput = TypeOf<typeof updateTodoSchema>;
export type UpdateProjectInput = TypeOf<typeof updateProjectSchema>;

export interface User {
  id: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
  name: string;
  session: string;
  todos?: Todo[];
}

export interface Todo {
  id: string;
  description: string;
  createdAt: string;
  endsAt: string;
  completed: boolean;
  creatorId: string;
  projectId?: string;
}

export interface Project {
  id: string;
  title: string;
  creatorId: string;
  createdAt: string;
  endsAt: string;
  todos?: Todo[];
}
