'use client';

import { useState } from 'react';
import BoardActionsButton from './board-actions-button';
import AddTaskButtonMobile from '../task/add-task-button-mobile';
import BoardActionsMenu from './board-actions-menu';

export default function BoardActions() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <section className="relative flex items-center justify-end gap-4">
      <AddTaskButtonMobile />
      <BoardActionsButton onClick={handleMenuOpen} isMenuOpen={isMenuOpen} />
      {isMenuOpen && <BoardActionsMenu />}
    </section>
  );
}
