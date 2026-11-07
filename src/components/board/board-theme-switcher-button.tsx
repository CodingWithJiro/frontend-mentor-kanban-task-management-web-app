import Image from 'next/image';

export default function BoardThemeSwitcherButton() {
  return (
    <button
      className="hover:bg-background-mobile-dropdown focus-visible:outline-main-purple cursor-pointer rounded-full px-2 py-2.5 focus-visible:outline-2 focus-visible:-outline-offset-4"
      type="button"
      aria-label="Explore all boards and select one or toggle theme."
    >
      <Image src="/icons/icon-chevron-down.svg" width={10} height={7} alt="" />
    </button>
  );
}
