import type { Request, Response } from "express";
import prisma from "../../src/lib/prisma.ts";

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
