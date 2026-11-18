import type { ZodType } from 'zod';

interface ValidateFormProps<T> {
  data: T;
  schema: ZodType<T>;
}

export function validateForm<T>({ data, schema }: ValidateFormProps<T>) {
  return schema.safeParse(data);
}
