import { useAuthStore } from '@/stores/auth.store';
import { Ref } from 'react';

interface ConfirmLogoutModalProps {
  confirmDialogRef: Ref<HTMLDialogElement | null>;
  onLogout: () => void;
  onCancel: () => void;
  isLoggingOut: boolean;
  errorMessage: string | null;
}

export default function ConfirmLogoutModal({
  confirmDialogRef,
  onLogout,
  onCancel,
  isLoggingOut,
  errorMessage,
}: ConfirmLogoutModalProps) {
  const user = useAuthStore((state) => state.user);

  return (
    <dialog
      className="bg-background-modal fixed top-1/2 left-1/2 w-[calc(100%-2rem)] max-w-90 -translate-x-1/2 -translate-y-1/2 rounded-md p-6 transition-colors backdrop:bg-black/75"
      ref={confirmDialogRef}
      closedby="none"
    >
      <h2 className="text-heading-l mb-6 font-bold">Log out?</h2>
      <p className="text-body-l text-medium-gray mb-6 font-medium">
        Are you sure you want to log out
        <span className="text-main-purple">{` @${user?.username}`}</span>?
      </p>
      <div className="relative flex flex-col items-center justify-center gap-4">
        {errorMessage && (
          <p className="text-red text-body-m absolute -top-4.5 left-2 w-full">
            {errorMessage}
          </p>
        )}

        <button
          className={`text-body-l ${
            isLoggingOut
              ? 'bg-medium-gray hover:bg-medium-gray cursor-not-allowed'
              : 'bg-main-purple hover:bg-main-purple-hover cursor-pointer'
          } focus-visible:outline-main-purple w-full rounded-[20px] px-4 py-2 font-bold text-white outline-offset-4 outline-transparent transition-colors focus-visible:outline-2`}
          type="button"
          onClick={onLogout}
          aria-busy={isLoggingOut}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? 'Logging out...' : 'Log Out'}
        </button>
        <button
          className="text-body-l text-main-purple bg-background-button-secondary hover:bg-background-button-secondary-hover focus-visible:outline-main-purple w-full cursor-pointer rounded-[20px] px-4 py-2 font-bold outline-offset-4 outline-transparent transition-colors focus-visible:outline-2"
          type="button"
          onClick={onCancel}
          disabled={isLoggingOut}
        >
          Cancel
        </button>
      </div>
    </dialog>
  );
}
