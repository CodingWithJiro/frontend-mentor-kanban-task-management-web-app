'use client';

import useLoginForm from '@/hooks/use-login-form';
import LoginHeader from './login-header';
import LoginInputs from './login-inputs';
import LoginAccountButton from './login-account-button';
import ThemeToggle from '../theme/theme-toggle';

export default function LoginForm() {
  const {
    inputData,
    formData,
    handleChange,
    passwordVisibility,
    handlePasswordVisibilityToggle,
    handleSubmit,
  } = useLoginForm();

  return (
    <form
      className="bg-background-form drop-shadow-form w-full max-w-120 rounded-lg p-6 transition-colors"
      aria-labelledby="login-heading"
      onSubmit={handleSubmit}
      noValidate
    >
      <LoginHeader />
      <LoginInputs
        inputData={inputData}
        formData={formData}
        handleChange={handleChange}
        passwordVisibility={passwordVisibility}
        handlePasswordVisibilityToggle={handlePasswordVisibilityToggle}
      />
      <LoginAccountButton />
      <ThemeToggle />
    </form>
  );
}
