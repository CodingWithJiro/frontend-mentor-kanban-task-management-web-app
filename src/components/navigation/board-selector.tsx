import Image from 'next/image';
import EditableBoardName from '../board/editable-board-name';

export default function BoardSelector() {
  return (
    <section className="flex items-center justify-start gap-4">
      <Image src="/icons/logo-mobile.svg" width={24} height={25} alt="" />

      <div className="flex items-center justify-start gap-2">
        <EditableBoardName />
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
