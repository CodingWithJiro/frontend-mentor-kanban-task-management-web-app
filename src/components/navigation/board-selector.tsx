'use client';

import Image from 'next/image';
import type { ChangeEvent, FocusEvent, SubmitEvent } from 'react';
import { useRef, useState } from 'react';

export default function BoardSelector() {
  const [boardName, setBoardName] = useState('Platform Launch');
  const [originalBoardName, setOriginalBoardName] = useState('Platform Launch');
  const [isEditingBoardName, setIsEditingBoardName] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBoardNameClick = () => {
    setOriginalBoardName(boardName);
    setIsEditingBoardName(true);
  };
  const handleBoardNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.target.value);
  };
  const handleBoardNameSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!boardName.trim()) {
      setBoardName(originalBoardName);
    }
    setIsEditingBoardName(false);
  };
  const handleBoardNameFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };
  const handleBoardNameBlur = () => {
    if (!boardName.trim()) {
      setBoardName(originalBoardName);
    }
    setIsEditingBoardName(false);
  };

  return (
    <section className="flex items-center justify-start gap-4">
      <Image src="/icons/logo-mobile.svg" width={24} height={25} alt="" />

      <div className="flex items-center justify-start gap-2">
        {isEditingBoardName ? (
          <form onSubmit={handleBoardNameSubmit}>
            <input
              className="text-heading-l text-foreground outline-main-purple bg-transparent font-bold outline-offset-4"
              ref={inputRef}
              size={12}
              type="text"
              maxLength={50}
              value={boardName}
              onChange={handleBoardNameChange}
              onBlur={handleBoardNameBlur}
              onFocus={handleBoardNameFocus}
              autoFocus
            />
          </form>
        ) : (
          <button
            type="button"
            className="focus-visible:outline-main-purple cursor-pointer focus-visible:outline-offset-4"
            onClick={handleBoardNameClick}
            aria-label={`Edit board name: ${boardName}`}
          >
            <h1
              className="text-heading-l xs:max-w-45 max-w-30 truncate font-bold"
              title={boardName}
            >
              {boardName}
            </h1>
          </button>
        )}

        <button
          className="cursor-pointer"
          type="button"
          aria-label="See other boards."
        >
          <Image
            src="/icons/icon-chevron-down.svg"
            width={10}
            height={7}
            alt=""
          />
        </button>
      </div>
    </section>
  );
}
