'use client';

import Image from 'next/image';
import BoardThemeSwitcherModal from './board-theme-switcher-modal';
import useBoardThemeSwitcherButton from '@/hooks/use-board-theme-switcher-button';

export default function BoardThemeSwitcherButton() {
  const { isOpen, dialogRef, handleCloseModal, handleOpenModal } =
    useBoardThemeSwitcherButton();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 bg-[#000]/50"></div>
      )}

      <button
        className="hover:bg-background-mobile-dropdown focus-visible:outline-main-purple cursor-pointer rounded-full px-2 py-2.5 focus-visible:outline-2 focus-visible:-outline-offset-4"
        type="button"
        aria-label="Explore all boards and select one or toggle theme."
        aria-expanded={isOpen}
        onClick={handleOpenModal}
      >
        <Image
          src={
            isOpen
              ? '/icons/icon-chevron-up.svg'
              : '/icons/icon-chevron-down.svg'
          }
          width={10}
          height={7}
          alt=""
        />
      </button>

      <BoardThemeSwitcherModal
        onClose={handleCloseModal}
        dialogRef={dialogRef}
      />
    </>
  );
}
