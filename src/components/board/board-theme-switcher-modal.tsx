import type { Ref } from 'react';
import ThemeToggle from '../theme/theme-toggle';
import CloseButton from '../ui/close-button';
import CreateNewBoardButton from './create-new-board-button';
import AllBoardList from './all-board-list';

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
      className="bg-background-modal fixed top-20 left-1/2 w-66 -translate-x-1/2 rounded-lg p-4 transition-colors backdrop:bg-transparent"
      ref={dialogRef}
      onClose={onClose}
      closedby="any"
    >
      <CloseButton onClick={onClose} />
      <section className="mb-4 px-2">
        <AllBoardList />
        <div className="-ml-6 flex flex-col">
          <CreateNewBoardButton />
        </div>
      </section>
      <ThemeToggle />
    </dialog>
  );
}
