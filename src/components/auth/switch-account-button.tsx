'use client';

import useSwitchAccountButton from '@/hooks/use-switch-account-button';

export default function SwitchAccountButton() {
  const { isSwitching, errorMessage, handleSwitchAccount } =
    useSwitchAccountButton();

  return (
    <div className="relative">
      <button
        type="button"
        className={`text-heading-m focus-visible:outline-main-purple flex w-full ${isSwitching ? 'text-medium-gray cursor-not-allowed' : 'text-main-purple cursor-pointer hover:underline'} items-center justify-start gap-3 rounded-r-full px-6 py-2.5 font-bold underline-offset-4 -outline-offset-3 outline-transparent transition-colors focus-visible:outline-2`}
        aria-busy={isSwitching}
        disabled={isSwitching}
        onClick={handleSwitchAccount}
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
          <circle cx="5.5" cy="4" r="2.5" />
          <path d="M1 13.5v-1a4.5 4.5 0 0 1 9 0v1" />
          <path d="M11 5.5h3.5m-1.5-1.5 1.5 1.5-1.5 1.5" />
          <path d="M14.5 10.5H11m1.5-1.5L11 10.5l1.5 1.5" />
        </svg>
        <span>{isSwitching ? 'Switching Account...' : 'Switch Account'}</span>
      </button>
      {errorMessage && (
        <p
          role="alert"
          className="text-body-m text-red absolute -bottom-2 left-6 w-full"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
