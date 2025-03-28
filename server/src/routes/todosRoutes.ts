import { getTodos } from "../controllers/todosController";
import { Router } from "express";

const router = Router();

router.get("/", getTodos);

export default router;
