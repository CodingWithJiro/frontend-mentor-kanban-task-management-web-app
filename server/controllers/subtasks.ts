import type { Request, Response } from "express";
import prisma from "../../src/lib/prisma.ts";
import { createSubtaskSchema } from "../schemas/create-subtask.schema.ts";
import { updateSubtaskSchema } from "../schemas/update-subtask.schema.ts";

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

export async function createSubtask(req: Request, res: Response) {
  const validationResult = createSubtaskSchema.safeParse(req.body);
  const isInvalid = !validationResult.success;
  if (isInvalid) {
    return res.status(400).json({
      message: "Invalid subtask data.",
      errors: validationResult.error.issues,
    });
  }
  const { title, isCompleted } = validationResult.data;
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
  const column = await prisma.column.findFirst({
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
  const lastSubtask = await prisma.subtask.findFirst({
    where: { taskId },
    orderBy: { position: "desc" },
    select: { position: true },
  });
  const position = lastSubtask ? lastSubtask.position + 1 : 1;
  const subtask = await prisma.subtask.create({
    data: {
      title,
      isCompleted,
      position,
      taskId,
    },
  });
  return res.status(201).json({
    message: "Subtask created successfully.",
    subtask,
  });
}

export async function updateSubtask(req: Request, res: Response) {
  const validationResult = updateSubtaskSchema.safeParse(req.body);
  const isInvalid = !validationResult.success;
  if (isInvalid) {
    return res.status(400).json({
      message: "Invalid subtask data.",
      errors: validationResult.error.issues,
    });
  }
  const { title, isCompleted } = validationResult.data;
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
  const column = await prisma.column.findFirst({
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
  const updatedSubtask = await prisma.subtask.update({
    where: { id: subtaskId },
    data: {
      title,
      isCompleted,
    },
  });
  return res.status(200).json({
    message: "Subtask updated successfully.",
    subtask: updatedSubtask,
  });
}
