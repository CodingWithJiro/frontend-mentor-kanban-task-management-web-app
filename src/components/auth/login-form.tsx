import LoginHeader from './login-header';

export default function LoginForm() {
  return (
    <form
      className="bg-background-form drop-shadow-form w-full max-w-120 rounded-lg p-6 transition-colors"
      aria-labelledby="login-heading"
      noValidate
    >
      <LoginHeader />
    </form>
  );
}
