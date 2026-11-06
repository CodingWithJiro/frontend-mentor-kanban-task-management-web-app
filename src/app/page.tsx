'use client';

import { useTheme } from 'next-themes';

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <main>
      <button
        type="button"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        Toggle Theme
      </button>
    </main>
  );
}
