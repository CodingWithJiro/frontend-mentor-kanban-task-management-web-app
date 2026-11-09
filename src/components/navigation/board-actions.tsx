import EditBoardButton from '../board/edit-board-button';
import AddTaskButtonMobile from '../task/add-task-button-mobile';

export default function BoardActions() {
  return (
    <section className="flex items-center justify-end gap-4">
      <AddTaskButtonMobile />
      <EditBoardButton />
    </section>
  );
}
