import { addTodo, getAllTodos } from "../controllers/todosController";
import { Router } from "express";

const router = Router();

router.get("/", getAllTodos);
router.post("/add", addTodo);

export default router;
