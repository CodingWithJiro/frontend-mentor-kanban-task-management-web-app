import type { ChangeEvent, FocusEvent, SubmitEvent } from 'react';
import type { AuthResponse } from '@/types/auth.type';
import type {
  Errors,
  FormData,
  FormField,
  InputData,
} from '@/types/login-form.type';
import { validateForm } from '@/utils/validate-form';
import { useState } from 'react';
import { loginSchema } from '../../shared/schemas/login.schema';
import { loginAccount } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'next/navigation';
import { ZodSafeParseResult } from 'zod';

export default function useLoginForm() {
  const [formData, setFormData] = useState<FormData>({
    identifier: '',
    password: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
  });
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const updateAuth = useAuthStore((state) => state.updateAuth);
  const router = useRouter();

  const updateFormFieldError = (
    result: ZodSafeParseResult<string>,
    field: FormField,
  ) => {
    const isStillInputError = !result.success;
    const errorMessage = result.error?.issues[0].message;
    setErrors((prev) => {
      return { ...prev, [field]: isStillInputError ? errorMessage : undefined };
    });
  };

  const inputData: InputData[] = [
    { name: 'identifier', label: 'Email or username', type: 'text' },
    {
      name: 'password',
      label: 'Password',
      type: `${passwordVisibility.password ? 'text' : 'password'}`,
    },
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setServerError('');
    const field = name as keyof typeof loginSchema.shape;
    const isAlreadyInputError = !!errors[field];
    if (isAlreadyInputError) {
      const result = loginSchema.shape[field].safeParse(value);
      updateFormFieldError(result, field);
    }
  };
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const field = name as keyof typeof loginSchema.shape;
    const result = loginSchema.shape[field].safeParse(value);
    updateFormFieldError(result, field);
  };
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError('');
    const userData = {
      identifier: formData.identifier,
      password: formData.password,
    };
    const validationResult = validateForm({
      data: userData,
      schema: loginSchema,
    });
    if (!validationResult.success) {
      const fields: FormField[] = ['identifier', 'password'];
      const allErrors = validationResult.error.issues;
      fields.forEach((field) => {
        const error = allErrors.find(({ path: [name] }) => field === name);
        const errorMessage = error?.message;
        setErrors((prev) => ({ ...prev, [field]: errorMessage }));
      });
      return;
    }
    try {
      setIsSubmitting(true);
      const result: AuthResponse = await loginAccount(validationResult.data);
      updateAuth(result.accessToken, result.user);
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError('Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const handlePasswordVisibilityToggle = (field: 'password') => {
    setPasswordVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return {
    formData,
    inputData,
    handleChange,
    passwordVisibility,
    handlePasswordVisibilityToggle,
    handleSubmit,
    handleBlur,
    isSubmitting,
    serverError,
    errors,
  };
}
