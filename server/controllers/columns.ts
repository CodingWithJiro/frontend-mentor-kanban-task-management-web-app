import type { Request, Response } from "express";
import prisma from "../../src/lib/prisma.ts";
import { createColumnSchema } from "../schemas/create-column.schema.ts";

export async function getColumns(req: Request, res: Response) {
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
  return res.status(200).json({
    message: "Column retrieved successfully.",
    column,
  });
}

export async function createColumn(req: Request, res: Response) {
  const validationResult = createColumnSchema.safeParse(req.body);
  const isInvalid = !validationResult.success;
  if (isInvalid) {
    return res.status(400).json({
      message: "Invalid column data.",
      errors: validationResult.error.issues,
    });
  }
  const { name, color } = validationResult.data;
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

export async function deleteColumn(req: Request, res: Response) {
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
  const existingColumn = await prisma.column.findUnique({
    where: {
      id: columnId,
      boardId,
    },
  });
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
