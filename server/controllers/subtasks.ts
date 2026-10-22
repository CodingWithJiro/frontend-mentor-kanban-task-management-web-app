import type { Request, Response } from "express";
import prisma from "../../src/lib/prisma.ts";

export async function getSubtasks(req: Request, res: Response) {
  const { userId } = req;
  if (userId === undefined) {
    return res.status(401).json({
      message: "Not authorized.",
    });
  }
  const boardId = Number(req.params.boardId);
  const isInvalidBoardId = !Number.isInteger(boardId) || boardId <= 0;
  if (isInvalidBoardId) {
    return res.status(400).json({
      message: "Invalid board ID.",
    });
  }
  const board = await prisma.board.findFirst({
    where: {
      id: boardId,
      userId,
    },
  });
  if (!board) {
    return res.status(404).json({
      message: "Board not found.",
    });
  }
  const columnId = Number(req.params.columnId);
  const isInvalidColumnId = !Number.isInteger(columnId) || columnId <= 0;
  if (isInvalidColumnId) {
    return res.status(400).json({
      message: "Invalid column ID.",
    });
  }
  const column = await prisma.column.findUnique({
    where: {
      id: columnId,
      boardId,
    },
  });
  if (!column) {
    return res.status(404).json({
      message: "Column not found.",
    });
  }
  const taskId = Number(req.params.taskId);
  const isInvalidTaskId = !Number.isInteger(taskId) || taskId <= 0;
  if (isInvalidTaskId) {
    return res.status(400).json({
      message: "Invalid task ID.",
    });
  }
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
      columnId,
    },
  });
  if (!task) {
    return res.status(404).json({
      message: "Task not found.",
    });
  }
  const subtasks = await prisma.subtask.findMany({
    where: {
      taskId,
    },
    orderBy: {
      position: "asc",
    },
  });
  return res.status(200).json({
    message: "Subtasks successfully retrieved.",
    subtasks,
  });
}

export async function getSubtask(req: Request, res: Response) {
  const { userId } = req;
  if (userId === undefined) {
    return res.status(401).json({
      message: "Not authorized.",
    });
  }
  const boardId = Number(req.params.boardId);
  const isInvalidBoardId = !Number.isInteger(boardId) || boardId <= 0;
  if (isInvalidBoardId) {
    return res.status(400).json({
      message: "Invalid board ID.",
    });
  }
  const board = await prisma.board.findFirst({
    where: {
      id: boardId,
      userId,
    },
  });
  if (!board) {
    return res.status(404).json({
      message: "Board not found.",
    });
  }
  const columnId = Number(req.params.columnId);
  const isInvalidColumnId = !Number.isInteger(columnId) || columnId <= 0;
  if (isInvalidColumnId) {
    return res.status(400).json({
      message: "Invalid column ID.",
    });
  }
  const column = await prisma.column.findUnique({
    where: {
      id: columnId,
      boardId,
    },
  });
  if (!column) {
    return res.status(404).json({
      message: "Column not found.",
    });
  }
  const taskId = Number(req.params.taskId);
  const isInvalidTaskId = !Number.isInteger(taskId) || taskId <= 0;
  if (isInvalidTaskId) {
    return res.status(400).json({
      message: "Invalid task ID.",
    });
  }
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
      columnId,
    },
  });
  if (!task) {
    return res.status(404).json({
      message: "Task not found.",
    });
  }
  const subtaskId = Number(req.params.subtaskId);
  const isInvalidSubtaskId = !Number.isInteger(subtaskId) || subtaskId <= 0;
  if (isInvalidSubtaskId) {
    return res.status(400).json({
      message: "Invalid subtask ID.",
    });
  }
  const subtask = await prisma.subtask.findUnique({
    where: {
      id: subtaskId,
      taskId,
    },
  });
  if (!subtask) {
    return res.status(404).json({
      message: "Subtask not found.",
    });
  }
  return res.status(200).json({
    message: "Subtask successfully retrieved.",
    subtask,
  });
}
