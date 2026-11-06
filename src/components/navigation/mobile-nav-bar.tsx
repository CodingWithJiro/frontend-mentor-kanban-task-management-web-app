import AddTask from './add-task';
import BoardSelector from './board-selector';

export default function MobileNavBar() {
  return (
    <header className="bg-background-navbar flex min-h-16 flex-row items-center justify-between px-4">
      <BoardSelector />
      <AddTask />
    </header>
  );
}
