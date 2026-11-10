import { useState, useRef } from 'react';

export default function useBoardThemeSwitcherButton() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpenModal = () => {
    if (dialogRef.current?.open) return;
    dialogRef.current?.showModal();
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    dialogRef.current?.close();
    setIsOpen(false);
  };

  return { isOpen, dialogRef, handleCloseModal, handleOpenModal };
}
