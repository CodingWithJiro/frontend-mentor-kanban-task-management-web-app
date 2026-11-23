'use client';

import useLogoutButton from '@/hooks/use-logout-button';

interface LogoutButtonProps {
  onClose: () => void;
}

export default function LogoutButton({ onClose }: LogoutButtonProps) {
  const { handleLogout } = useLogoutButton();

  const handleClick = async () => {
    await handleLogout();
    onClose();
  };

  return (
    <button
      className="text-heading-m text-medium-gray focus-visible:outline-main-purple flex w-full cursor-pointer items-center justify-start gap-3 rounded-r-full px-6 py-2.5 font-bold underline-offset-4 -outline-offset-3 outline-transparent transition-colors hover:underline focus-visible:outline-2"
      type="button"
      onClick={handleClick}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M10 2.5H13A1 1 0 0 1 14 3.5v9a1 1 0 0 1-1 1H10" />
        <path d="M8 8H2" />
        <path d="m5 5-3 3 3 3" />
      </svg>
      <span>Log Out</span>
    </button>
  );
}
