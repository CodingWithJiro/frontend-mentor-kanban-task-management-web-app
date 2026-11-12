import type { ZodType } from 'zod';

interface validateFormProps {
  data: unknown;
  schema: ZodType;
}

export function validateForm({ data, schema }: validateFormProps) {
  return schema.safeParse(data);
}
