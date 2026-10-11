import type { Request, Response } from "express";
import prisma from "../../src/lib/prisma.ts";
import { createBoardSchema } from "../schemas/create-board.schema.ts";

export async function getBoards(req: Request, res: Response) {
  const boards = await prisma.board.findMany();
  return res.json(boards);
}

export async function getBoard(req: Request, res: Response) {
  const boardId = +req.params.id;
  const board = await prisma.board.findUnique({
    where: {
      id: boardId,
    },
  });
  return res.json(board);
}

export async function createBoard(req: Request, res: Response) {
  const validationResult = createBoardSchema.safeParse(req.body);
  const isInvalid = !validationResult.success;
  if (isInvalid) {
    return res.status(400).json({
      message: "Invalid board data.",
      errors: validationResult.error.issues,
    });
  }

  const { name } = validationResult.data;
  const { userId } = req;

  if (userId === undefined) {
    return res.status(401).json({
      message: "Not authorized.",
    });
  }

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
