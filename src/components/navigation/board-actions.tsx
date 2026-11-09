import Image from 'next/image';

export default function BoardActions() {
  return (
    <section className="flex items-center justify-end gap-4">
      <button
        className="bg-main-purple focus-visible:outline-main-purple hover:bg-main-purple-hover cursor-pointer rounded-3xl px-4.5 py-2.5 opacity-100 outline-offset-4 outline-transparent transition-colors focus-visible:outline-2"
        type="button"
        aria-label="Add task to this board."
      >
        <Image
          src="/icons/icon-add-task-mobile.svg"
          width={12}
          height={12}
          alt=""
        />
      </button>

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
    </section>
  );
}
