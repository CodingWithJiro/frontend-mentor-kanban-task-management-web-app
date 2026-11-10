export default function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="text-medium-gray focus-visible:outline-main-purple focus-visible:text-main-purple hover:text-main-purple absolute top-0 right-0 scale-75 rounded-full p-4 outline-transparent transition-colors focus-visible:outline-2"
      type="button"
      onClick={onClick}
    >
      <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
        <g fill="currentColor" fillRule="evenodd">
          <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
          <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
        </g>
      </svg>
    </button>
  );
}
