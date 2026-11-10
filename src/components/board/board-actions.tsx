import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import BoardActionsButton from './board-actions-button';
import AddTaskButtonMobile from '../task/add-task-button-mobile';
import BoardActionsMenu from './board-actions-menu';

export default function BoardActions() {
  return (
    <div className="flex items-center justify-end gap-4">
      <AddTaskButtonMobile />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <BoardActionsButton />
        </DropdownMenu.Trigger>
        <BoardActionsMenu />
      </DropdownMenu.Root>
    </div>
  );
}
