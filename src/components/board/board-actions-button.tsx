interface BoardActionsButtonProps {
  onClick: () => void;
  isMenuOpen: boolean;
}

export default function BoardActionsButton({
  onClick,
  isMenuOpen,
}: BoardActionsButtonProps) {
  return (
    <button
      className="text-medium-gray hover:text-main-purple colors focus-visible:outline-main-purple cursor-pointer rounded-full outline-offset-4 transition focus-visible:outline-2"
      type="button"
      onClick={onClick}
      aria-label="Open to edit or delete current board."
      aria-haspopup="menu"
      aria-expanded={isMenuOpen}
    >
      <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
        <g fill="currentColor" fillRule="evenodd">
          <circle cx="2.308" cy="2.308" r="2.308" />
          <circle cx="2.308" cy="10" r="2.308" />
          <circle cx="2.308" cy="17.692" r="2.308" />
        </g>
      </svg>
    </button>
  );
}
