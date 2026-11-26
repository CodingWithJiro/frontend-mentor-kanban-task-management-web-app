import { Ref } from 'react';

interface ConfirmLogoutModalProps {
  confirmDialogRef: Ref<HTMLDialogElement | null>;
  onLogout: () => void;
  onCancel: () => void;
}

export default function ConfirmLogoutModal({
  confirmDialogRef,
  onLogout,
  onCancel,
}: ConfirmLogoutModalProps) {
  return (
    <dialog
      className="bg-background-modal fixed top-1/2 left-1/2 w-78 -translate-x-1/2 -translate-y-1/2 rounded-lg p-4 transition-colors backdrop:bg-black/75"
      ref={confirmDialogRef}
      closedby="none"
    >
      <p>Are you sure you want to log out?</p>

      <div className="flex justify-end gap-4">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" onClick={onLogout}>
          Log out
        </button>
      </div>
    </dialog>
  );
}
