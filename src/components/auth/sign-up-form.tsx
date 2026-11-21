'use client';

import useSignUpForm from '@/hooks/use-sign-up-form.ts';
import ThemeToggle from '../theme/theme-toggle.tsx';
import SignUpHeader from './sign-up-header.tsx';
import SignUpInputs from './sign-up-inputs.tsx';
import CreateAccountButton from './create-account-button.tsx';

export default function SignUpForm() {
  const {
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
  } = useSignUpForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-background-form drop-shadow-form w-full max-w-120 rounded-lg p-6 transition-colors"
      aria-labelledby="signup-heading"
      noValidate
    >
      <SignUpHeader />
      <SignUpInputs
        inputData={inputData}
        errors={errors}
        formData={formData}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handlePasswordVisibilityToggle={handlePasswordVisibilityToggle}
        passwordVisibility={passwordVisibility}
        passwordRules={passwordRules}
        failedPasswordRules={failedPasswordRules}
        passwordValidation={passwordValidation}
        hasStartedTypingPassword={hasStartedTypingPassword}
      />
      <CreateAccountButton
        isSubmitting={isSubmitting}
        serverError={serverError}
        successMessage={successMessage}
      />
      <ThemeToggle />
    </form>
  );
}
