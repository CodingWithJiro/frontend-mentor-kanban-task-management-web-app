export default function SignUpButton() {
  return (
    <button
      className="text-heading-m text-main-purple focus-visible:outline-main-purple flex w-full cursor-pointer items-center justify-start gap-3 rounded-r-full px-6 py-2.5 font-bold underline-offset-4 -outline-offset-3 outline-transparent transition-colors hover:underline focus-visible:outline-2"
      type="button"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="6" cy="4.5" r="2.5" />
        <path d="M1.5 14v-1.2A4.5 4.5 0 0 1 6 8.3a4.5 4.5 0 0 1 4.5 4.5V14" />
        <path d="M13 7v5m-2.5-2.5h5" />
      </svg>
      <span>Sign Up</span>
    </button>
  );
}
