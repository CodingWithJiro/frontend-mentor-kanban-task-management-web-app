'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleClick = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <div className="bg-background-theme-toggle flex h-12 w-full items-center justify-center gap-6 rounded-md">
      <Image src="/icons/icon-light-theme.svg" width={19} height={19} alt="" />

      <button
        className="bg-main-purple hover:bg-main-purple-hover focus-visible:outline-main-purple h-5 w-10 cursor-pointer rounded-full p-0.75 focus-visible:outline-2 focus-visible:outline-offset-4"
        role="switch"
        type="button"
        onClick={handleClick}
        aria-checked={theme === 'dark'}
        aria-label={`Change theme to ${theme === 'light' ? 'dark' : 'light'}`}
        suppressHydrationWarning
      >
        <div className="relative size-3.5 rounded-full bg-white transition-transform dark:translate-x-5"></div>
      </button>

      <Image src="/icons/icon-dark-theme.svg" width={16} height={16} alt="" />
    </div>
  );
}
