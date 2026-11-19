'use client';

import useSignUpForm from '@/hooks/use-sign-up-form.ts';
import ThemeToggle from '../theme/theme-toggle.tsx';
import SignUpHeader from './sign-up-header.tsx';
import SignUpInputs from './sign-up-inputs.tsx';

export default function SignUpForm() {
  const { handleSubmit, isSubmitting, serverError, successMessage } =
    useSignUpForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-background-form drop-shadow-form w-full max-w-120 rounded-lg p-6 transition-colors"
      aria-labelledby="signup-heading"
      noValidate
    >
      <SignUpHeader />
      <SignUpInputs />

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
