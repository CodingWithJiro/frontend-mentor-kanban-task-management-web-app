import { useTheme } from 'next-themes';

export default function useThemeToggle() {
  const { theme, setTheme } = useTheme();

  const nextTheme = theme === 'light' ? 'dark' : 'light';
  const handleClick = () => setTheme(nextTheme);

  return { handleClick, theme, nextTheme };
}
