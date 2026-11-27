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

export type Errors = Partial<Record<FormField, string>>;
