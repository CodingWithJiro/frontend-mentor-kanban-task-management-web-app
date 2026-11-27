import Image from 'next/image';

export default function LoginHeader() {
  return (
    <header className="mb-6 flex items-center justify-start gap-2">
      <Image src="/icons/logo-mobile.svg" width={24} height={25} alt="" />
      <h1
        id="login-heading"
        className="text-heading-l font-bold transition-colors"
      >
        Login
      </h1>
    </header>
  );
}
