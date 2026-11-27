'use client';

import type { Errors, FormData, InputData } from '@/types/sign-up-form.type';
import type { ChangeEvent, FocusEvent } from 'react';
import type { ZodSafeParseResult } from 'zod';
import SignUpPasswordRules from './sign-up-password-rules';
import ShowPasswordButton from './show-password-button';

interface SignUpInputsProps {
  inputData: InputData[];
  errors: Errors;
  formData: FormData;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: FocusEvent<HTMLInputElement>) => void;
  handlePasswordVisibilityToggle: (
    field: 'password' | 'confirmPassword',
  ) => void;
  passwordVisibility: {
    password: boolean;
    confirmPassword: boolean;
  };
  passwordRules: {
    errorMessage: string;
    rule: string;
  }[];
  failedPasswordRules: string[];
  passwordValidation: ZodSafeParseResult<string>;
  hasStartedTypingPassword: boolean;
}

export default function SignUpInputs({
  inputData,
  errors,
  formData,
  handleChange,
  handleBlur,
  handlePasswordVisibilityToggle,
  passwordVisibility,
  passwordRules,
  failedPasswordRules,
  passwordValidation,
  hasStartedTypingPassword,
}: SignUpInputsProps) {
  return (
    <ul className="mb-8 flex flex-col gap-6">
      {inputData.map(({ name, label, type }) => {
        const errorMessage = errors[name];
        const isError = !!errorMessage;
        const isPasswordInput = name === 'password';
        const isConfirmPasswordInput = name === 'confirmPassword';
        return (
          <li key={name} className="relative">
            <input
              className={`peer text-body-l outline-medium-gray/25 w-full rounded-sm px-4 py-3 ${(isPasswordInput || isConfirmPasswordInput) && 'pr-15'} font-medium placeholder-transparent outline-2 transition-colors ${isError ? 'hover:outline-red focus-visible:outline-red outline-red' : 'hover:outline-main-purple focus-visible:outline-main-purple'}`}
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
                <SignUpPasswordRules
                  passwordRules={passwordRules}
                  passwordValidation={passwordValidation}
                  failedPasswordRules={failedPasswordRules}
                  hasStartedTypingPassword={hasStartedTypingPassword}
                />
                <ShowPasswordButton
                  handlePasswordVisibilityToggle={
                    handlePasswordVisibilityToggle
                  }
                  passwordVisibility={passwordVisibility}
                  name={name}
                  label={label}
                />
              </>
            )}

            {isConfirmPasswordInput && (
              <ShowPasswordButton
                handlePasswordVisibilityToggle={handlePasswordVisibilityToggle}
                passwordVisibility={passwordVisibility}
                name={name}
                label={label}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
