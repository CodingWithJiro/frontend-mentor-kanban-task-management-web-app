export default function BoardActionsMenu() {
  return (
    <section className="bg-background-board-actions-menu drop-shadow-board-actions-menu absolute top-[calc(100%+8px)] right-0 flex min-w-48 flex-col gap-4 rounded-lg p-4 transition-colors">
      <button
        className="text-body-l text-medium-gray focus-visible:outline-main-purple focus-visible:text-main-purple hover:text-main-purple flex cursor-pointer flex-row items-center justify-start gap-2 rounded-full font-medium underline-offset-4 outline-offset-8 outline-transparent transition-colors hover:underline focus-visible:outline-2"
        type="button"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.333 2.667a1.886 1.886 0 0 1 2.667 2.666l-8.667 8.667L2 14l.667-3.333 8.666-8Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Edit Board</span>
      </button>
      <button
        className="text-body-l text-red focus-visible:outline-red flex cursor-pointer flex-row items-center justify-start gap-2 rounded-full font-medium underline-offset-4 outline-offset-8 outline-transparent transition-colors hover:underline focus-visible:outline-2"
        type="button"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.667 4h10.666M6 4V2.667h4V4m2 0-.667 9.333H4.667L4 4m2.667 2.667v4m2.666-4v4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Delete Board</span>
      </button>
    </section>
  );
}
