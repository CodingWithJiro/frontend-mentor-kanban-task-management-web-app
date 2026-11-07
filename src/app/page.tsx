'use client';

import { useTheme } from 'next-themes';
import MobileNavBar from '@/components/navigation/mobile-nav-bar';

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <main>
      <MobileNavBar />

      <button
        type="button"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="mt-10"
      >
        Toggle Theme
      </button>
    </main>
  );
}
