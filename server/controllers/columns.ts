import type { Request, Response } from "express";
import prisma from "../../src/lib/prisma.ts";
import { createColumnSchema } from "../schemas/create-column.schema.ts";
import { updateColumnSchema } from "../schemas/update-column.schema.ts";
import { isInvalidId } from "../utils/validate-id.ts";
import {
  getBoardColumn,
  getUserBoard,
} from "../services/resource-access.service.ts";

export async function getColumns(req: Request, res: Response) {
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
  const columns = await prisma.column.findMany({
    where: {
      boardId,
    },
    orderBy: {
      position: "asc",
    },
  });
  return res.status(200).json({
    message: "Columns retrieved successfully.",
    columns,
  });
}

export async function getColumn(req: Request, res: Response) {
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
  return res.status(200).json({
    message: "Column retrieved successfully.",
    column,
  });
}

export async function createColumn(req: Request, res: Response) {
  const { userId } = req;
  if (userId === undefined) {
    return res.status(401).json({
      message: "Not authorized.",
    });
  }
  const validationResult = createColumnSchema.safeParse(req.body);
  const isInvalid = !validationResult.success;
  if (isInvalid) {
    return res.status(400).json({
      message: "Invalid column data.",
      errors: validationResult.error.issues,
    });
  }
  const { name, color } = validationResult.data;
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
  const lastColumn = await prisma.column.findFirst({
    where: { boardId },
    orderBy: { position: "desc" },
    select: { position: true },
  });
  const position = lastColumn ? lastColumn.position + 1 : 1;
  const column = await prisma.column.create({
    data: {
      name,
      color,
      position,
      boardId,
    },
  });
  return res.status(201).json({
    message: "Column created successfully.",
    column,
  });
}

export async function updateColumn(req: Request, res: Response) {
  const { userId } = req;
  if (userId === undefined) {
    return res.status(401).json({
      message: "Not authorized.",
    });
  }
  const validationResult = updateColumnSchema.safeParse(req.body);
  const isInvalid = !validationResult.success;
  if (isInvalid) {
    return res.status(400).json({
      message: "Invalid column data.",
      errors: validationResult.error.issues,
    });
  }
  const { name, color } = validationResult.data;
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
  const updatedColumn = await prisma.column.update({
    where: { id: columnId },
    data: { name, color },
  });
  return res.status(200).json({
    message: "Column updated successfully.",
    column: updatedColumn,
  });
}

export async function deleteColumn(req: Request, res: Response) {
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
  const existingColumn = await getBoardColumn(boardId, columnId);
  if (!existingColumn) {
    return res.status(404).json({
      message: "Column not found.",
    });
  }
  await prisma.column.delete({
    where: {
      id: columnId,
    },
  });
  return res.status(200).json({
    message: "Column successfully deleted.",
  });
}
