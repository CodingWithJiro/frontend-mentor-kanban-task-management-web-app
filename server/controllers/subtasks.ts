import type { Request, Response } from "express";
import prisma from "../../src/lib/prisma.ts";
import { createSubtaskSchema } from "../schemas/create-subtask.schema.ts";
import { updateSubtaskSchema } from "../schemas/update-subtask.schema.ts";
import { isInvalidId } from "../utils/validate-id.ts";
import {
  getBoardColumn,
  getUserBoard,
  getColumnTask,
  getTaskSubtask,
} from "../services/resource-access.service.ts";

export async function getSubtasks(req: Request, res: Response) {
  const { userId } = req;
  if (userId === undefined) {
    return res.status(401).json({
      message: "Not authorized.",
    });
  }
  const boardId = Number(req.params.boardId);
  if (isInvalidId(boardId)) {
    return res.status(400).json({
      message: "Invalid board ID.",
    });
  }
  const board = await getUserBoard(userId, boardId);
  if (!board) {
    return res.status(404).json({
      message: "Board not found.",
    });
  }
  const columnId = Number(req.params.columnId);
  if (isInvalidId(columnId)) {
    return res.status(400).json({
      message: "Invalid column ID.",
    });
  }
  const column = await getBoardColumn(boardId, columnId);
  if (!column) {
    return res.status(404).json({
      message: "Column not found.",
    });
  }
  const taskId = Number(req.params.taskId);
  if (isInvalidId(taskId)) {
    return res.status(400).json({
      message: "Invalid task ID.",
    });
  }
  const task = await getColumnTask(columnId, taskId);
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
  if (isInvalidId(boardId)) {
    return res.status(400).json({
      message: "Invalid board ID.",
    });
  }
  const board = await getUserBoard(userId, boardId);
  if (!board) {
    return res.status(404).json({
      message: "Board not found.",
    });
  }
  const columnId = Number(req.params.columnId);
  if (isInvalidId(columnId)) {
    return res.status(400).json({
      message: "Invalid column ID.",
    });
  }
  const column = await getBoardColumn(boardId, columnId);
  if (!column) {
    return res.status(404).json({
      message: "Column not found.",
    });
  }
  const taskId = Number(req.params.taskId);
  if (isInvalidId(taskId)) {
    return res.status(400).json({
      message: "Invalid task ID.",
    });
  }
  const task = await getColumnTask(columnId, taskId);
  if (!task) {
    return res.status(404).json({
      message: "Task not found.",
    });
  }
  const subtaskId = Number(req.params.subtaskId);
  if (isInvalidId(subtaskId)) {
    return res.status(400).json({
      message: "Invalid subtask ID.",
    });
  }
  const subtask = await getTaskSubtask(taskId, subtaskId);
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
  if (isInvalidId(boardId)) {
    return res.status(400).json({
      message: "Invalid board ID.",
    });
  }
  const board = await getUserBoard(userId, boardId);
  if (!board) {
    return res.status(404).json({
      message: "Board not found.",
    });
  }
  const columnId = Number(req.params.columnId);
  if (isInvalidId(columnId)) {
    return res.status(400).json({
      message: "Invalid column ID.",
    });
  }
  const column = await getBoardColumn(boardId, columnId);
  if (!column) {
    return res.status(404).json({
      message: "Column not found.",
    });
  }
  const taskId = Number(req.params.taskId);
  if (isInvalidId(taskId)) {
    return res.status(400).json({
      message: "Invalid task ID.",
    });
  }
  const task = await getColumnTask(columnId, taskId);
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
  if (isInvalidId(boardId)) {
    return res.status(400).json({
      message: "Invalid board ID.",
    });
  }
  const board = await getUserBoard(userId, boardId);
  if (!board) {
    return res.status(404).json({
      message: "Board not found.",
    });
  }
  const columnId = Number(req.params.columnId);
  if (isInvalidId(columnId)) {
    return res.status(400).json({
      message: "Invalid column ID.",
    });
  }
  const column = await getBoardColumn(boardId, columnId);
  if (!column) {
    return res.status(404).json({
      message: "Column not found.",
    });
  }
  const taskId = Number(req.params.taskId);
  if (isInvalidId(taskId)) {
    return res.status(400).json({
      message: "Invalid task ID.",
    });
  }
  const task = await getColumnTask(columnId, taskId);
  if (!task) {
    return res.status(404).json({
      message: "Task not found.",
    });
  }
  const subtaskId = Number(req.params.subtaskId);
  if (isInvalidId(subtaskId)) {
    return res.status(400).json({
      message: "Invalid subtask ID.",
    });
  }
  const subtask = await getTaskSubtask(taskId, subtaskId);
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

export async function deleteSubtask(req: Request, res: Response) {
  const { userId } = req;
  if (userId === undefined) {
    return res.status(401).json({
      message: "Not authorized.",
    });
  }
  const boardId = Number(req.params.boardId);
  if (isInvalidId(boardId)) {
    return res.status(400).json({
      message: "Invalid board ID.",
    });
  }
  const board = await getUserBoard(userId, boardId);
  if (!board) {
    return res.status(404).json({
      message: "Board not found.",
    });
  }
  const columnId = Number(req.params.columnId);
  if (isInvalidId(columnId)) {
    return res.status(400).json({
      message: "Invalid column ID.",
    });
  }
  const column = await getBoardColumn(boardId, columnId);
  if (!column) {
    return res.status(404).json({
      message: "Column not found.",
    });
  }
  const taskId = Number(req.params.taskId);
  if (isInvalidId(taskId)) {
    return res.status(400).json({
      message: "Invalid task ID.",
    });
  }
  const task = await getColumnTask(columnId, taskId);
  if (!task) {
    return res.status(404).json({
      message: "Task not found.",
    });
  }
  const subtaskId = Number(req.params.subtaskId);
  if (isInvalidId(subtaskId)) {
    return res.status(400).json({
      message: "Invalid subtask ID.",
    });
  }
  const existingSubtask = await getTaskSubtask(taskId, subtaskId);
  if (!existingSubtask) {
    return res.status(404).json({
      message: "Subtask not found.",
    });
  }
  await prisma.subtask.delete({
    where: { id: subtaskId },
  });
  return res.status(200).json({
    message: "Subtask successfully deleted.",
  });
}
