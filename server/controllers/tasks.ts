import type { Request, Response } from "express";
import prisma from "../../src/lib/prisma.ts";
import { createTaskSchema } from "../schemas/create-task.schema.ts";

export async function getTasks(req: Request, res: Response) {
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
  return res.status(200).json({
    message: "Task retrieved successfully.",
    task,
  });
}

export async function createTask(req: Request, res: Response) {
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
