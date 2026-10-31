import type { Request, Response } from "express";
import prisma from "../../src/lib/prisma.ts";
import { isInvalidId } from "../utils/validate-id.ts";
import { getUserBoard } from "../services/resource-access.service.ts";

export async function getBoards(req: Request, res: Response) {
  const userId = req.userId!;
  const boards = await prisma.board.findMany({
    where: { userId },
    orderBy: { position: "asc" },
  });
  return res.status(200).json({
    message: "Boards data successfully obtained.",
    boards,
  });
}

export async function getBoard(req: Request, res: Response) {
  const userId = req.userId!;
  const boardId = Number(req.params.id);
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
  return res.status(200).json({
    message: "Board data successfully obtained.",
    board,
  });
}

export async function createBoard(req: Request, res: Response) {
  const userId = req.userId!;
  const { name } = req.body;
  const lastBoard = await prisma.board.findFirst({
    where: { userId },
    orderBy: { position: "desc" },
    select: { position: true },
  });
  const position = lastBoard ? lastBoard.position + 1 : 1;
  const board = await prisma.board.create({
    data: {
      name,
      position,
      userId,
    },
  });
  return res.status(201).json({
    message: "Board created successfully.",
    board,
  });
}

export async function updateBoard(req: Request, res: Response) {
  const userId = req.userId!;
  const { name } = req.body;
  const boardId = Number(req.params.id);
  if (isInvalidId(boardId)) {
    return res.status(400).json({
      message: "Invalid board ID.",
    });
  }
  const existingBoard = await getUserBoard(userId, boardId);
  if (!existingBoard) {
    return res.status(404).json({
      message: "Board not found.",
    });
  }
  const updatedBoard = await prisma.board.update({
    where: { id: boardId },
    data: { name },
  });
  return res.status(200).json({
    message: "Board updated successfully.",
    board: updatedBoard,
  });
}

export async function deleteBoard(req: Request, res: Response) {
  const userId = req.userId!;
  const boardId = Number(req.params.id);
  if (isInvalidId(boardId)) {
    return res.status(400).json({
      message: "Invalid board ID.",
    });
  }
  const existingBoard = await getUserBoard(userId, boardId);
  if (!existingBoard) {
    return res.status(404).json({
      message: "Board not found.",
    });
  }
  await prisma.board.delete({
    where: {
      id: boardId,
    },
  });
  return res.status(200).json({
    message: "Board successfully deleted.",
  });
}
