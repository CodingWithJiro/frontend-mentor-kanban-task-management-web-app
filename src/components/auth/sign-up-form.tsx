'use client';

import type { ChangeEvent, FocusEvent, SubmitEvent } from 'react';
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

const inputFields: InputField[] = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'username', label: 'Username', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
  { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const isNameUpdatedWithConfirmInput =
      name === 'password' && formData.confirmPassword;
    if (isNameUpdatedWithConfirmInput) {
      const isSamePassword = value === formData.confirmPassword;
      const errorMessage = !isSamePassword
        ? 'Password does not match.'
        : undefined;
      setErrors((prev) => ({ ...prev, confirmPassword: errorMessage }));
    }
    if (name === 'confirmPassword') {
      const isSamePassword = value === formData.password;
      const errorMessage = !isSamePassword
        ? 'Password does not match.'
        : undefined;
      setErrors((prev) => ({ ...prev, confirmPassword: errorMessage }));
      return;
    }
    const field = name as keyof typeof registerSchema.shape;
    const isAlreadyInputError = !!errors[field];
    if (isAlreadyInputError) {
      const result = registerSchema.shape[field].safeParse(value);
      setErrors((prev) => {
        const isStillInputError = !result.success;
        const errorMessage = result.error?.issues[0].message;
        return {
          ...prev,
          [field]: isStillInputError ? errorMessage : undefined,
        };
      });
    }
  };
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'confirmPassword') {
      const isSamePassword = value === formData.password;
      const errorMessage = !isSamePassword
        ? 'Password does not match.'
        : undefined;
      setErrors((prev) => ({
        ...prev,
        confirmPassword: errorMessage,
      }));
      return;
    }
    const field = name as keyof typeof registerSchema.shape;
    const result = registerSchema.shape[field].safeParse(value);
    setErrors((prev) => {
      const isStillInputError = !result.success;
      const errorMessage = result.error?.issues[0].message;
      return {
        ...prev,
        [field]: isStillInputError ? errorMessage : undefined,
      };
    });
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
    if (!validationResult.success) return;
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

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-background-form drop-shadow-form w-full max-w-120 rounded-lg p-6 transition-colors"
    >
      <div className="mb-6 flex items-center justify-start gap-2">
        <Image src="/icons/logo-mobile.svg" width={24} height={25} alt="" />
        <h2 className="text-heading-l font-bold transition-colors">Sign Up</h2>
      </div>

      <ul className="mb-8 flex flex-col gap-6">
        {inputFields.map(({ name, label, type }) => {
          const errorMessage = errors[name];
          const isError = !!errorMessage;
          return (
            <li key={name} className="relative">
              <input
                className={`peer text-body-l outline-medium-gray/25 w-full rounded-sm px-4 py-3 font-medium placeholder-transparent outline-2 transition-colors ${errors[name] ? 'hover:outline-red focus-visible:outline-red outline-red' : 'hover:outline-main-purple focus-visible:outline-main-purple'}`}
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

              {isError && (
                <p
                  id={`${name}-error`}
                  className="text-red absolute -bottom-4.5 left-0 text-[0.70rem] font-medium"
                >
                  {errorMessage}
                </p>
              )}
            </li>
          );
        })}
      </ul>
      <button
        type="submit"
        className="bg-main-purple hover:bg-main-purple-hover text-body-l mb-4 w-full cursor-pointer rounded-[20px] px-4 py-2 font-bold text-white transition-colors"
      >
        Create Account
      </button>
      <ThemeToggle />
    </form>
  );
}
