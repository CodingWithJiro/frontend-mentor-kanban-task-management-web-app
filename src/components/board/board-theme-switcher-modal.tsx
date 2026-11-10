import type { Ref } from 'react';
import ThemeToggle from '../theme/theme-toggle';
import CloseButton from '../ui/close-button';
import CreateNewBoardButton from './create-new-board-button';
import AllBoardList from './all-board-list';
import LoginButton from '../auth/login-button';
import SignUpButton from '../auth/sign-up-button';

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
        <hr className="bg-medium-gray/30 mx-auto mt-2 mb-3.5 h-px border-0" />
        <div className="-ml-6 flex flex-col">
          <LoginButton />
          <SignUpButton />
        </div>
      </section>
      <ThemeToggle />
    </dialog>
  );
}
