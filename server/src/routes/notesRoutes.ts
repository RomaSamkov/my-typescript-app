import {
  addNote,
  deleteNote,
  editNote,
  getAllNotes,
} from "../controllers/notesController";
import { Router } from "express";

const router = Router();

router.get("/", getAllNotes);
router.post("/add", addNote);
router.delete("/:id", deleteNote);
router.patch("/:id", editNote);

export default router;
