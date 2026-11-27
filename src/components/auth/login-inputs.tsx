import type { Errors, FormData, InputData } from '@/types/login-form.type';
import type { ChangeEvent, FocusEvent } from 'react';
import ShowPasswordButton from './show-password-button';

interface LoginInputsProps {
  inputData: InputData[];
  formData: FormData;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  passwordVisibility: { password: boolean };
  handlePasswordVisibilityToggle: (field: 'password') => void;
  handleBlur: (e: FocusEvent<HTMLInputElement>) => void;
  errors: Errors;
}

export default function LoginInputs({
  inputData,
  formData,
  handleChange,
  passwordVisibility,
  handlePasswordVisibilityToggle,
  handleBlur,
  errors,
}: LoginInputsProps) {
  return (
    <ul className="mb-8 flex flex-col gap-6">
      {inputData.map(({ name, label, type }) => {
        const errorMessage = errors[name];
        const isError = !!errorMessage;
        const isPasswordInput = name === 'password';
        return (
          <li key={name} className="relative">
            <input
              className={`peer text-body-l outline-medium-gray/25 ${isError ? 'hover:outline-red focus-visible:outline-red outline-red' : 'hover:outline-main-purple focus-visible:outline-main-purple'} w-full rounded-sm px-4 ${isPasswordInput && 'pr-15'} py-3 font-medium placeholder-transparent outline-2 transition-colors`}
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
              className={`text-heading-s text-medium-gray peer-focus:bg-background-form peer-not-placeholder-shown:bg-background-form ${isError ? 'text-red' : 'peer-focus:text-main-purple peer-hover:text-main-purple'} pointer-events-none absolute top-4 left-4 origin-left font-bold transition-all peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:px-1 peer-focus:-top-2 peer-focus:scale-90 peer-focus:px-1`}
              htmlFor={name}
            >
              {label}
            </label>

            {isPasswordInput && (
              <ShowPasswordButton
                name={name}
                label={label}
                passwordVisibility={passwordVisibility}
                handlePasswordVisibilityToggle={() =>
                  handlePasswordVisibilityToggle('password')
                }
              />
            )}

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
  );
}
