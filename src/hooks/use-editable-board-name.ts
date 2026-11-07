import type { ChangeEvent, FocusEvent, SubmitEvent } from 'react';
import { useRef, useState } from 'react';

export default function useEditableBoardName() {
  const [boardName, setBoardName] = useState('Platform Launch');
  const [originalBoardName, setOriginalBoardName] = useState('Platform Launch');
  const [isEditingBoardName, setIsEditingBoardName] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const finishEditing = () => {
    const isEmptyBoardName = !boardName.trim();
    if (isEmptyBoardName) setBoardName(originalBoardName);
    setIsEditingBoardName(false);
  };
  const handleBoardNameClick = () => {
    setOriginalBoardName(boardName);
    setIsEditingBoardName(true);
  };
  const handleBoardNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.target.value);
  };
  const handleBoardNameSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    finishEditing();
  };
  const handleBoardNameFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };
  const handleBoardNameBlur = () => {
    finishEditing();
  };

  return {
    isEditingBoardName,
    inputRef,
    boardName,
    handleBoardNameSubmit,
    handleBoardNameChange,
    handleBoardNameFocus,
    handleBoardNameBlur,
    handleBoardNameClick,
  };
}
