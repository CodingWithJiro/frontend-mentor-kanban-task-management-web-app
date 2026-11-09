import Image from 'next/image';

export default function EditBoardButton() {
  return (
    <button
      className="cursor-pointer"
      type="button"
      aria-label="Open board actions."
    >
      <Image
        src="/icons/icon-vertical-ellipsis.svg"
        className="scale-80"
        width={5}
        height={20}
        alt=""
      />
    </button>
  );
}
