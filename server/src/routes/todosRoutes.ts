import { addTodo, getAllTodos } from "../controllers/todosController";
import { Router } from "express";

const router = Router();

router.get("/", getAllTodos);
router.post("/addtodo", addTodo);

export default router;
