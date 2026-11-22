import type { ChangeEvent, FocusEvent, SubmitEvent } from 'react';
import type { ZodSafeParseResult } from 'zod';
import type { AuthResponse } from '@/types/auth.type';
import type {
  Errors,
  FormData,
  FormField,
  InputData,
} from '@/types/sign-up-form.type';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateForm } from '@/utils/validate-form';
import { registerSchema } from '../../shared/schemas/register.schema';
import { useAuthStore } from '@/stores/auth.store.ts';
import { registerAccount } from '@/services/auth.service.ts';

const passwordRules = [
  {
    errorMessage: 'Must contain at least 12 characters.',
    rule: 'Min 12 characters',
  },
  {
    errorMessage: 'Must not exceed 128 characters.',
    rule: 'Max 128 characters',
  },
  {
    errorMessage: 'Must contain one lowercase letter.',
    rule: 'One lowercase letter',
  },
  {
    errorMessage: 'Must contain one uppercase letter.',
    rule: 'One uppercase letter',
  },
  {
    errorMessage: 'Must contain one number.',
    rule: 'One number',
  },
  {
    errorMessage: 'Must contain one special character.',
    rule: 'One special character',
  },
];

export default function useSignUpForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const updateAuth = useAuthStore((state) => state.updateAuth);
  const router = useRouter();

  const updateConfirmPasswordError = (isSamePassword: boolean) => {
    const errorMessage = !isSamePassword
      ? 'Password does not match.'
      : undefined;
    setErrors((prev) => ({ ...prev, confirmPassword: errorMessage }));
  };
  const updateFormFieldError = (
    result: ZodSafeParseResult<string>,
    field: FormField,
  ) => {
    const isStillInputError = !result.success;
    const errorMessage = result.error?.issues[0].message;
    setErrors((prev) => {
      return {
        ...prev,
        [field]: isStillInputError ? errorMessage : undefined,
      };
    });
  };

  const inputData: InputData[] = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    {
      name: 'password',
      label: 'Password',
      type: `${passwordVisibility.password ? 'text' : 'password'}`,
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: `${passwordVisibility.confirmPassword ? 'text' : 'password'}`,
    },
  ];
  const passwordValidation = registerSchema.shape.password.safeParse(
    formData.password,
  );
  const failedPasswordRules = passwordValidation.success
    ? []
    : passwordValidation.error.issues.map((issue) => issue.message);
  const hasStartedTypingPassword = formData.password.length > 0;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setServerError('');
    setSuccessMessage('');
    const isUpdatingPassword = name === 'password';
    const hasConfirmPassword = !!formData.confirmPassword;
    if (isUpdatingPassword && hasConfirmPassword) {
      const isSamePassword = value === formData.confirmPassword;
      updateConfirmPasswordError(isSamePassword);
    }
    const isUpdatingConfirmPassword = name === 'confirmPassword';
    if (isUpdatingConfirmPassword) {
      const isConfirmPasswordAlreadyInvalid = !!errors.confirmPassword;
      if (isConfirmPasswordAlreadyInvalid) {
        const isSamePassword = value === formData.password;
        updateConfirmPasswordError(isSamePassword);
      }
      return;
    }
    const field = name as keyof typeof registerSchema.shape;
    const isAlreadyInputError = !!errors[field];
    if (isAlreadyInputError) {
      const result = registerSchema.shape[field].safeParse(value);
      updateFormFieldError(result, field);
    }
  };
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isUpdatingConfirmPassword = name === 'confirmPassword';
    if (isUpdatingConfirmPassword) {
      const isEmpty = formData.confirmPassword === '';
      if (isEmpty) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: 'Please verify password.',
        }));
        return;
      }
      const isSamePassword = value === formData.password;
      updateConfirmPasswordError(isSamePassword);
      return;
    }
    const field = name as keyof typeof registerSchema.shape;
    const result = registerSchema.shape[field].safeParse(value);
    updateFormFieldError(result, field);
  };
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError('');
    setSuccessMessage('');
    const userData = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };
    const validationResult = validateForm({
      data: userData,
      schema: registerSchema,
    });
    const isConfirmPasswordAlreadyInvalid =
      !!errors.confirmPassword || formData.confirmPassword === '';
    if (!validationResult.success || isConfirmPasswordAlreadyInvalid) {
      const fields: FormField[] = ['name', 'username', 'email', 'password'];
      if (!validationResult.success) {
        const allErrors = validationResult.error.issues;
        fields.forEach((field) => {
          const error = allErrors.find(({ path: [name] }) => field === name);
          const errorMessage = error?.message;
          setErrors((prev) => ({ ...prev, [field]: errorMessage }));
        });
      }
      if (isConfirmPasswordAlreadyInvalid) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: 'Please verify password.',
        }));
      }
      return;
    }
    try {
      setIsSubmitting(true);
      const result: AuthResponse = await registerAccount(validationResult.data);
      setSuccessMessage(result.message);
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
  const handlePasswordVisibilityToggle = (
    field: 'password' | 'confirmPassword',
  ) => {
    setPasswordVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return {
    handleSubmit,
    inputData,
    errors,
    formData,
    handleChange,
    handleBlur,
    passwordRules,
    failedPasswordRules,
    passwordValidation,
    hasStartedTypingPassword,
    handlePasswordVisibilityToggle,
    passwordVisibility,
    isSubmitting,
    serverError,
    successMessage,
  };
}
