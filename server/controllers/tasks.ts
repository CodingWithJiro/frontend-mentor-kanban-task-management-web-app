import type { Request, Response } from "express";
import prisma from "../../src/lib/prisma.ts";
import { createTaskSchema } from "../schemas/create-task.schema.ts";
import { updateTaskSchema } from "../schemas/update-task.schema.ts";
import { isInvalidId } from "../utils/validate-id.ts";
import {
  getBoardColumn,
  getColumnTask,
  getUserBoard,
} from "../services/resource-access.service.ts";

export async function getTasks(req: Request, res: Response) {
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
  const tasks = await prisma.task.findMany({
    where: {
      columnId,
    },
    orderBy: {
      position: "asc",
    },
  });
  return res.status(200).json({
    message: "Tasks retrieved successfully.",
    tasks,
  });
}

export async function getTask(req: Request, res: Response) {
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
  return res.status(200).json({
    message: "Task retrieved successfully.",
    task,
  });
}

export async function createTask(req: Request, res: Response) {
  const { userId } = req;
  if (userId === undefined) {
    return res.status(401).json({
      message: "Not authorized.",
    });
  }
  const validationResult = createTaskSchema.safeParse(req.body);
  const isInvalid = !validationResult.success;
  if (isInvalid) {
    return res.status(400).json({
      message: "Invalid task data.",
      errors: validationResult.error.issues,
    });
  }
  const { title, description } = validationResult.data;
  const isDescriptionMissing = !description || description.length === 0;
  const normalizedDescription = isDescriptionMissing ? null : description;
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
  const lastTask = await prisma.task.findFirst({
    where: { columnId },
    orderBy: { position: "desc" },
    select: { position: true },
  });
  const position = lastTask ? lastTask.position + 1 : 1;
  const task = await prisma.task.create({
    data: {
      title,
      description: normalizedDescription,
      position,
      columnId,
    },
  });
  return res.status(201).json({
    message: "Task created successfully.",
    task,
  });
}

export async function updateTask(req: Request, res: Response) {
  const { userId } = req;
  if (userId === undefined) {
    return res.status(401).json({
      message: "Not authorized.",
    });
  }
  const validationResult = updateTaskSchema.safeParse(req.body);
  const isInvalid = !validationResult.success;
  if (isInvalid) {
    return res.status(400).json({
      message: "Invalid task data.",
      errors: validationResult.error.issues,
    });
  }
  const { title, description } = validationResult.data;
  const isDescriptionMissing = !description || description.length === 0;
  const normalizedDescription = isDescriptionMissing ? null : description;
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
  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: {
      title,
      description: normalizedDescription,
    },
  });
  return res.status(200).json({
    message: "Task updated successfully.",
    task: updatedTask,
  });
}

export async function deleteTask(req: Request, res: Response) {
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
  const existingTask = await getColumnTask(columnId, taskId);
  if (!existingTask) {
    return res.status(404).json({
      message: "Task not found.",
    });
  }
  await prisma.task.delete({
    where: { id: taskId },
  });
  return res.status(200).json({
    message: "Task successfully deleted.",
  });
}
