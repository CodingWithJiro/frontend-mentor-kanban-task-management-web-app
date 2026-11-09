export default function BoardActionsButton() {
  return (
    <button
      className="text-medium-gray hover:text-main-purple colors focus-visible:outline-main-purple cursor-pointer rounded-full outline-offset-4 transition focus-visible:outline-2"
      type="button"
      aria-label="Open to edit or delete current board."
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
