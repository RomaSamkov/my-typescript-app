import {
  addTodo,
  deleteTodo,
  editTodo,
  getAllTodos,
} from "../controllers/todosController";
import { Router } from "express";

const router = Router();

router.get("/", getAllTodos);
router.post("/add", addTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id", editTodo);

export default router;
