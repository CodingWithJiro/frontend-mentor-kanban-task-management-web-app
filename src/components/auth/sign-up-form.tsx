'use client';

import type { ChangeEvent, FocusEvent, SubmitEvent } from 'react';
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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return { ...prev, [name]: value };
    });

    if (name === 'confirmPassword') {
      const isSamePassword = value === formData.password;
      if (!isSamePassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: 'Password not the same.',
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: undefined,
        }));
      }
      return;
    }

    const field = name as keyof typeof registerSchema.shape;
    if (errors[field]) {
      const result = registerSchema.shape[field].safeParse(value);
      setErrors((prev) => {
        const isError = !result.success;
        if (isError) {
          const errorMessage = result.error.issues[0].message;
          return { ...prev, [field]: errorMessage };
        }
        return { ...prev, [field]: undefined };
      });
    }
  };
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'confirmPassword') {
      const isSamePassword = value === formData.password;
      if (!isSamePassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: 'Password not the same.',
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: undefined,
        }));
      }
      return;
    }
    const field = name as keyof typeof registerSchema.shape;
    const result = registerSchema.shape[field].safeParse(value);
    setErrors((prev) => {
      const isError = !result.success;
      if (isError) {
        const errorMessage = result.error.issues[0].message;
        return { ...prev, [field]: errorMessage };
      }
      return { ...prev, [field]: undefined };
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-background-form drop-shadow-form rounded-lg p-6 transition-colors"
    >
      <h2 className="text-heading-l mb-6 font-bold transition-colors">
        Sign Up
      </h2>

      <ul>
        {inputFields.map(({ name, label, type }) => {
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
                aria-invalid={!!errors[name]}
                aria-describedby={errors[name] ? `${name}-error` : undefined}
                required
              />

              <label
                className={`text-heading-s text-medium-gray peer-focus:bg-background-form peer-not-placeholder-shown:bg-background-form pointer-events-none absolute top-4 left-4 origin-left font-bold transition-all peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:px-1 peer-focus:-top-2 peer-focus:scale-90 peer-focus:px-1 ${errors[name] ? 'text-red' : 'peer-focus:text-main-purple peer-hover:text-main-purple'}`}
                htmlFor={name}
              >
                {label}
              </label>

              {errors[name] && (
                <p id={`${name}-error`} className="text-red text-sm">
                  {errors[name]}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <button type="submit">Create Account</button>

      <ThemeToggle />
    </form>
  );
}
