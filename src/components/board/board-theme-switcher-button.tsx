'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import BoardThemeSwitcherModal from './board-theme-switcher-modal';

export default function BoardThemeSwitcherButton() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpenModal = () => {
    dialogRef.current?.showModal();
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    dialogRef.current?.close();
    setIsOpen(false);
  };

  return (
    <>
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
