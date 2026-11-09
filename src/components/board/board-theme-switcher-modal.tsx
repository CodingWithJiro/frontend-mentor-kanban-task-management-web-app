import type { Ref } from 'react';
import { useState } from 'react';
import ThemeToggle from '../theme/theme-toggle';

interface BoardThemeSwitcherModalProps {
  onClose: () => void;
  dialogRef: Ref<HTMLDialogElement | null>;
}

const MOCK_BOARDS_DATA: { id: number; name: string }[] = [
  { id: 1, name: 'Platform Launch' },
  { id: 2, name: 'Marketing Plan' },
  { id: 3, name: 'Roadmap' },
];

export default function BoardThemeSwitcherModal({
  onClose,
  dialogRef,
}: BoardThemeSwitcherModalProps) {
  const [selectedBoardId, setSelectedBoardId] = useState(1);

  const handleClick = (id: number) => {
    setSelectedBoardId(id);
  };

  return (
    <dialog
      className="bg-background-modal fixed top-20 left-1/2 w-66 -translate-x-1/2 rounded-lg p-4 transition-colors backdrop:bg-transparent"
      ref={dialogRef}
      onClose={onClose}
      closedby="any"
    >
      <button
        className="text-medium-gray focus-visible:outline-main-purple focus-visible:text-main-purple hover:text-main-purple absolute top-0 right-0 scale-75 rounded-full p-4 outline-transparent transition-colors focus-visible:outline-2"
        type="button"
        onClick={onClose}
      >
        <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
          <g fill="currentColor" fillRule="evenodd">
            <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
            <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
          </g>
        </svg>
      </button>

      <section className="mb-4 px-2">
        <h2 className="text-heading-s text-medium-gray tracking-heading-s mb-5 font-bold uppercase">{`All Boards (${MOCK_BOARDS_DATA.length})`}</h2>

        <ul className="-ml-6 flex flex-col">
          {MOCK_BOARDS_DATA.map(({ id, name }) => {
            const isSelected = id === selectedBoardId;

            return (
              <li key={id}>
                <button
                  className={`text-heading-m focus-visible:outline-main-purple flex w-full cursor-pointer items-center justify-start gap-3 rounded-r-full px-6 py-3.5 font-bold underline-offset-4 -outline-offset-3 outline-transparent transition-colors focus-visible:outline-2 ${isSelected ? 'bg-main-purple text-white' : 'text-medium-gray hover:text-main-purple hover:underline'}`}
                  type="button"
                  aria-label={`Select ${name} board.`}
                  aria-pressed={isSelected}
                  onClick={() => handleClick(id)}
                >
                  <svg
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>{name}</span>
                </button>
              </li>
            );
          })}
          <li>
            <button
              className="text-heading-m text-main-purple focus-visible:outline-main-purple flex w-full cursor-pointer items-center justify-start gap-3 rounded-r-full px-6 py-3.5 font-bold underline-offset-4 -outline-offset-3 outline-transparent transition-colors hover:underline focus-visible:outline-2"
              type="button"
            >
              <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                  fill="currentColor"
                />
              </svg>
              <span>+ Create New Board</span>
            </button>
          </li>
        </ul>
      </section>

      <ThemeToggle />
    </dialog>
  );
}
