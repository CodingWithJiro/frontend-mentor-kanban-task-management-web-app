import Image from 'next/image';

export default function SignUpHeader() {
  return (
    <header className="mb-6 flex items-center justify-start gap-2">
      <Image src="/icons/logo-mobile.svg" width={24} height={25} alt="" />
      <h1
        id="signup-heading"
        className="text-heading-l font-bold transition-colors"
      >
        Sign Up
      </h1>
    </header>
  );
}
