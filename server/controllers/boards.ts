import type { Request, Response } from "express";
import prisma from "../../src/lib/prisma.ts";

export async function getBoards(req: Request, res: Response) {
  const boards = await prisma.board.findMany();
  return res.json(boards);
}
