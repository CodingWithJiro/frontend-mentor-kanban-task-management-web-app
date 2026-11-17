'use client';

import type { ChangeEvent, FocusEvent, SubmitEvent } from 'react';
import type { ZodSafeParseResult } from 'zod';
import Image from 'next/image';
import { useState } from 'react';
import { validateForm } from '@/utils/validate-form';
import { registerSchema } from '../../../shared/schemas/register.schema.ts';
import { API_URL } from '@/config/env.ts';
import ThemeToggle from '../theme/theme-toggle.tsx';

interface FormData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type FormField = keyof FormData;

interface InputField {
  name: FormField;
  label: string;
  type: string;
}

type Errors = Partial<Record<FormField, string>>;

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

export default function SignUpForm() {
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
    if (isConfirmPasswordAlreadyInvalid) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: 'Please verify password.',
      }));
    }
    if (!validationResult.success) {
      const fields: FormField[] = ['name', 'username', 'email', 'password'];
      const allErrors = validationResult.error.issues;
      fields.forEach((field) => {
        const error = allErrors.find(({ path: [name] }) => field === name);
        const errorMessage = error?.message;
        setErrors((prev) => ({ ...prev, [field]: errorMessage }));
      });
      return;
    }
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(validationResult.data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      console.log('Registration successful!', result);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };
  const handlePasswordVisibilityToggle = (
    field: 'password' | 'confirmPassword',
  ) => {
    setPasswordVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const inputFields: InputField[] = [
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

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-background-form drop-shadow-form w-full max-w-120 rounded-lg p-6 transition-colors"
      noValidate
    >
      <div className="mb-6 flex items-center justify-start gap-2">
        <Image src="/icons/logo-mobile.svg" width={24} height={25} alt="" />
        <h2 className="text-heading-l font-bold transition-colors">Sign Up</h2>
      </div>

      <ul className="mb-8 flex flex-col gap-6">
        {inputFields.map(({ name, label, type }) => {
          const errorMessage = errors[name];
          const isError = !!errorMessage;
          const isPasswordInput = name === 'password';
          const isConfirmPasswordInput = name === 'confirmPassword';
          return (
            <li key={name} className="relative">
              <input
                className={`peer text-body-l outline-medium-gray/25 w-full rounded-sm px-4 py-3 font-medium placeholder-transparent outline-2 transition-colors ${isError ? 'hover:outline-red focus-visible:outline-red outline-red' : 'hover:outline-main-purple focus-visible:outline-main-purple'}`}
                id={name}
                name={name}
                type={type}
                value={formData[name]}
                placeholder=" "
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={isError}
                aria-describedby={isError ? `${name}-error` : undefined}
                required
              />

              <label
                className={`text-heading-s text-medium-gray peer-focus:bg-background-form peer-not-placeholder-shown:bg-background-form pointer-events-none absolute top-4 left-4 origin-left font-bold transition-all peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:px-1 peer-focus:-top-2 peer-focus:scale-90 peer-focus:px-1 ${isError ? 'text-red' : 'peer-focus:text-main-purple peer-hover:text-main-purple'}`}
                htmlFor={name}
              >
                {label}
              </label>

              {isError && !isPasswordInput && (
                <p
                  id={`${name}-error`}
                  className="text-red absolute -bottom-4.5 left-0 text-[0.70rem] font-medium"
                >
                  {errorMessage}
                </p>
              )}

              {isPasswordInput && (
                <>
                  <ul className="bg-background mx-auto mt-2 -mb-2 grid grid-cols-2 items-center gap-x-2 gap-y-2 rounded-md p-4 transition-colors">
                    {passwordRules.map(({ errorMessage, rule }) => {
                      const isSatisfied =
                        passwordValidation.success ||
                        !failedPasswordRules.includes(errorMessage);
                      const ruleColor =
                        isSatisfied && hasStartedTypingPassword
                          ? 'text-main-purple'
                          : 'text-medium-gray';
                      return (
                        <li
                          key={rule}
                          className={`text-body-m font-medium ${ruleColor}`}
                        >
                          {rule}
                        </li>
                      );
                    })}
                  </ul>
                  <button
                    type="button"
                    onClick={() => handlePasswordVisibilityToggle('password')}
                    className="text-heading-s text-medium-gray hover:bg-background hover:text-main-purple focus-visible:outline-main-purple focus-visible:text-main-purple absolute top-3 right-2 cursor-pointer rounded-full px-2 py-1 font-bold outline-transparent transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
                  >
                    {passwordVisibility.password ? 'Hide' : 'Show'}
                  </button>
                </>
              )}

              {isConfirmPasswordInput && (
                <button
                  type="button"
                  onClick={() =>
                    handlePasswordVisibilityToggle('confirmPassword')
                  }
                  className="text-heading-s text-medium-gray hover:bg-background hover:text-main-purple focus-visible:outline-main-purple focus-visible:text-main-purple absolute top-3 right-2 cursor-pointer rounded-full px-2 py-1 font-bold outline-transparent transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  {passwordVisibility.confirmPassword ? 'Hide' : 'Show'}
                </button>
              )}
            </li>
          );
        })}
      </ul>
      <button
        type="submit"
        className="bg-main-purple hover:bg-main-purple-hover text-body-l focus-visible:outline-main-purple mb-4 w-full cursor-pointer rounded-[20px] px-4 py-2 font-bold text-white outline-offset-4 outline-transparent transition-colors focus-visible:outline-2"
      >
        Create Account
      </button>
      <ThemeToggle />
    </form>
  );
}
