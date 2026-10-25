import prisma from "../../src/lib/prisma.ts";

export async function getUserBoard(userId: number, boardId: number) {
  const userBoard = await prisma.board.findUnique({
    where: {
      id: boardId,
      userId,
    },
  });
  return userBoard;
}

export async function getBoardColumn(boardId: number, columnId: number) {
  const boardColumn = await prisma.column.findUnique({
    where: {
      id: columnId,
      boardId,
    },
  });
  return boardColumn;
}

export async function getColumnTask(columnId: number, taskId: number) {
  const columnTask = await prisma.task.findUnique({
    where: {
      id: taskId,
      columnId,
    },
  });
  return columnTask;
}

export async function getTaskSubtask(taskId: number, subtaskId: number) {
  const taskSubtask = await prisma.subtask.findUnique({
    where: {
      id: subtaskId,
      taskId,
    },
  });
  return taskSubtask;
}
