'use client';

import Image from 'next/image';
import ThemeToggle from '../theme/theme-toggle.tsx';
import useSignUpForm from '@/hooks/use-sign-up-form.ts';

export default function SignUpForm() {
  const {
    handleSubmit,
    inputFields,
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
  } = useSignUpForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-background-form drop-shadow-form w-full max-w-120 rounded-lg p-6 transition-colors"
      aria-labelledby="signup-heading"
      noValidate
    >
      <div className="mb-6 flex items-center justify-start gap-2">
        <Image src="/icons/logo-mobile.svg" width={24} height={25} alt="" />
        <h2
          id="signup-heading"
          className="text-heading-l font-bold transition-colors"
        >
          Sign Up
        </h2>
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
                  <ul
                    id="password-error"
                    className="bg-background mx-auto mt-2 -mb-2 grid grid-cols-2 items-center gap-x-2 gap-y-2 rounded-md p-4 transition-colors"
                  >
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
      <div className="relative">
        <button
          type="submit"
          className={`hover:bg-main-purple-hover text-body-l focus-visible:outline-main-purple mb-4 w-full ${isSubmitting ? 'bg-medium-gray hover:bg-medium-gray cursor-not-allowed' : 'bg-main-purple cursor-pointer'} rounded-[20px] px-4 py-2 font-bold text-white outline-offset-4 outline-transparent transition-colors focus-visible:outline-2`}
          aria-busy={isSubmitting}
          disabled={isSubmitting}
        >
          {`${isSubmitting ? 'Signing up...' : 'Create Account'}`}
        </button>
        {serverError && (
          <p
            role="alert"
            className="text-heading-s text-red absolute -top-5 left-2 font-bold transition-colors"
          >{`Sign up failed. ${serverError}`}</p>
        )}
        {successMessage && (
          <p
            role="status"
            className="text-heading-s absolute -top-5 left-2 font-bold text-green-500 transition-colors"
          >
            {successMessage}
          </p>
        )}
      </div>
      <ThemeToggle />
    </form>
  );
}
