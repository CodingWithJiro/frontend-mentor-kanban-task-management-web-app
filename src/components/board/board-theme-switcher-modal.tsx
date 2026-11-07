import type { Ref } from 'react';
import ThemeToggle from '../theme/theme-toggle';

interface BoardThemeSwitcherModalProps {
  onClose: () => void;
  dialogRef: Ref<HTMLDialogElement | null>;
}

export default function BoardThemeSwitcherModal({
  onClose,
  dialogRef,
}: BoardThemeSwitcherModalProps) {
  return (
    <dialog
      className="fixed top-20 left-1/2 -translate-x-1/2 outline-1 outline-red-500"
      ref={dialogRef}
      onClose={onClose}
    >
      <h2>All Boards</h2>

      <button type="button" onClick={onClose}>
        Close
      </button>

      <ThemeToggle />
    </dialog>
  );
}
