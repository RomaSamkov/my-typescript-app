import Todo from "../models/Todo";
import { Request, Response, RequestHandler } from "express";

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find({});
    res.status(200).json({ success: true, data: todos });
  } catch (error) {
    console.log("Error in fetching todos controller.", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addTodo: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const todo = req.body;
  if (!todo.title) {
    res.status(400).json({ message: "Title is required" });
    return;
  }

  const newTodo = new Todo(todo);

  try {
    await newTodo.save();
    res.status(201).json({ success: true, data: newTodo });
  } catch (error) {
    console.log("Error in saving todo controller.", error);

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteTodo: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const todoId = req.params.id;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      res.status(404).json({ success: false, message: "Todo not found" });
      return;
    }
    res.status(200).json({ success: true, data: deletedTodo });
  } catch (error) {
    console.log("Error in deleting todo controller.", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
