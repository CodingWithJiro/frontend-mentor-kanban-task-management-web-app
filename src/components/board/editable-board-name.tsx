'use client';
import useEditableBoardName from '@/hooks/use-editable-board-name';

export default function EditableBoardName() {
  const {
    isEditingBoardName,
    inputRef,
    boardName,
    handleBoardNameBlur,
    handleBoardNameChange,
    handleBoardNameClick,
    handleBoardNameFocus,
    handleBoardNameSubmit,
  } = useEditableBoardName();

  return (
    <>
      {isEditingBoardName ? (
        <form onSubmit={handleBoardNameSubmit}>
          <label htmlFor="board-name" className="sr-only">
            Board name
          </label>

          <input
            className="text-heading-l text-foreground focus-visible:outline-main-purple bg-transparent font-bold outline-offset-4 outline-transparent transition-colors"
            id="board-name"
            ref={inputRef}
            size={12}
            type="text"
            maxLength={50}
            value={boardName}
            onChange={handleBoardNameChange}
            onBlur={handleBoardNameBlur}
            onFocus={handleBoardNameFocus}
            autoFocus
          />
        </form>
      ) : (
        <button
          type="button"
          className="focus-visible:outline-main-purple cursor-pointer outline-transparent transition-colors focus-visible:outline-offset-4"
          onClick={handleBoardNameClick}
          aria-label={`Edit board name: ${boardName}`}
        >
          <h2
            className="text-heading-l xs:max-w-45 max-w-30 truncate font-bold transition-colors"
            title={boardName}
          >
            {boardName}
          </h2>
        </button>
      )}
    </>
  );
}
