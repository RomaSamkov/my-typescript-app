import { Request, Response } from "express";

export const getTodos = async (req: Request, res: Response) => {
  res.send("Hello Typescript Server!");
};
