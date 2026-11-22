'use client';

import useLoginForm from '@/hooks/use-login-form';
import LoginHeader from './login-header';
import LoginInputs from './login-inputs';

export default function LoginForm() {
  const {
    inputData,
    formData,
    handleChange,
    passwordVisibility,
    handlePasswordVisibilityToggle,
  } = useLoginForm();

  return (
    <form
      className="bg-background-form drop-shadow-form w-full max-w-120 rounded-lg p-6 transition-colors"
      aria-labelledby="login-heading"
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
    </form>
  );
}
