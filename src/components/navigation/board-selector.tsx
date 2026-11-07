import Image from 'next/image';
import EditableBoardName from '../board/editable-board-name';
import BoardThemeSwitcherButton from '../board/board-theme-switcher-button';

export default function BoardSelector() {
  return (
    <section className="flex items-center justify-start gap-4">
      <Image src="/icons/logo-mobile.svg" width={24} height={25} alt="" />

      <div className="flex items-center justify-start">
        <EditableBoardName />
        <BoardThemeSwitcherButton />
      </div>
    </section>
  );
}
