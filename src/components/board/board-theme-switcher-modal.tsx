import type { Ref } from 'react';

interface BoardThemeSwitcherModalProps {
  onClose: () => void;
  dialogRef: Ref<HTMLDialogElement | null>;
}

export default function BoardThemeSwitcherModal({
  onClose,
  dialogRef,
}: BoardThemeSwitcherModalProps) {
  return (
    <dialog ref={dialogRef} onClose={onClose}>
      <h2>All Boards</h2>

      <button type="button" onClick={onClose}>
        Close
      </button>
    </dialog>
  );
}
