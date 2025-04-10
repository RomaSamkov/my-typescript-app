import Note from "../models/Note";
import { Request, Response, RequestHandler } from "express";

// Get all notes
export const getAllNotes: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const notes = await Note.find({});
    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    console.error("Error in fetching notes controller.", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single note by ID
export const addNote: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const note = req.body;
  if (!note.title || !note.text) {
    res.status(400).json({ message: "Title and content are required" });
    return;
  }

  const newNote = new Note(note);

  try {
    await newNote.save();
    res.status(201).json({ success: true, data: newNote });
  } catch (error) {
    console.error("Error in saving note controller.", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Edit a note by ID
export const editNote: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const noteId = req.params.id;
  const updates = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(noteId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedNote) {
      res.status(404).json({ success: false, message: "Note not found" });
      return;
    }

    res.status(200).json({ success: true, data: updatedNote });
  } catch (error) {
    console.error("Error in editing note controller.", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete a note by ID
export const deleteNote: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const noteId = req.params.id;

  try {
    const deletedNote = await Note.findByIdAndDelete(noteId);
    if (!deletedNote) {
      res.status(404).json({ success: false, message: "Note not found" });
      return;
    }
    res.status(200).json({ success: true, data: deletedNote });
  } catch (error) {
    console.error("Error in deleting note controller.", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
