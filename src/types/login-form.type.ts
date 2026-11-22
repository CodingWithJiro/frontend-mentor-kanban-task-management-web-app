export interface FormData {
  identifier: string;
  password: string;
}

export type FormField = keyof FormData;

export interface InputData {
  name: FormField;
  label: string;
  type: string;
}

export type Errors = Partial<Record<FormField, string>>;
