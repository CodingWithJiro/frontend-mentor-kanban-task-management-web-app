'use client';

import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleClick = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <button type="button" onClick={handleClick} className="mt-10">
      Toggle Theme
    </button>
  );
}
