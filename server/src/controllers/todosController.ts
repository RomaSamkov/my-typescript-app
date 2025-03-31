import { database } from "../db/database";
import { Request, Response } from "express";

export const getTodos = async (req: Request, res: Response) => {
  res.send(database);
};
