import type { AuthUser } from './auth.type';

export interface FormData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type FormField = keyof FormData;

export interface InputData {
  name: FormField;
  label: string;
  type: string;
}

export interface RegisterResponse {
  message: string;
  accessToken: string;
  user: AuthUser;
}

export type Errors = Partial<Record<FormField, string>>;
