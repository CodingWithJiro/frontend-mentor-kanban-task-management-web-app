'use client';

import useSignUpForm from '@/hooks/use-sign-up-form';
import SignUpPasswordRules from './sign-up-password-rules';

export default function SignUpInputs() {
  const {
    inputData,
    errors,
    formData,
    handleChange,
    handleBlur,
    passwordVisibility,
    handlePasswordVisibilityToggle,
  } = useSignUpForm();

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
                <SignUpPasswordRules />

                <button
                  type="button"
                  onClick={() => handlePasswordVisibilityToggle(name)}
                  aria-controls={name}
                  aria-label={
                    passwordVisibility[name]
                      ? `Hide ${label.toLowerCase()}.`
                      : `Show ${label.toLowerCase()}.`
                  }
                  className="text-heading-s text-medium-gray hover:bg-background hover:text-main-purple focus-visible:outline-main-purple focus-visible:text-main-purple absolute top-3 right-2 cursor-pointer rounded-full px-2 py-1 font-bold outline-transparent transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  {passwordVisibility[name] ? 'Hide' : 'Show'}
                </button>
              </>
            )}

            {isConfirmPasswordInput && (
              <button
                type="button"
                onClick={() => handlePasswordVisibilityToggle(name)}
                aria-controls={name}
                aria-label={
                  passwordVisibility[name]
                    ? `Hide ${label.toLowerCase()}.`
                    : `Show ${label.toLowerCase()}.`
                }
                className="text-heading-s text-medium-gray hover:bg-background hover:text-main-purple focus-visible:outline-main-purple focus-visible:text-main-purple absolute top-3 right-2 cursor-pointer rounded-full px-2 py-1 font-bold outline-transparent transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                {passwordVisibility[name] ? 'Hide' : 'Show'}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
