import {
  addTodo,
  deleteTodo,
  getAllTodos,
} from "../controllers/todosController";
import { Router } from "express";

const router = Router();

router.get("/", getAllTodos);
router.post("/add", addTodo);
router.delete("/:id", deleteTodo);

export default router;
