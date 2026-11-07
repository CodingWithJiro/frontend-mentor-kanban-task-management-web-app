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
          <input
            className="text-heading-l text-foreground outline-main-purple bg-transparent font-bold outline-offset-4"
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
          className="focus-visible:outline-main-purple cursor-pointer focus-visible:outline-offset-4"
          onClick={handleBoardNameClick}
          aria-label={`Edit board name: ${boardName}`}
        >
          <h1
            className="text-heading-l xs:max-w-45 max-w-30 truncate font-bold"
            title={boardName}
          >
            {boardName}
          </h1>
        </button>
      )}
    </>
  );
}
