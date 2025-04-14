import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  addNote,
  editNote,
  deleteNote,
  fetchNotes,
} from "../slices/NotesSlice";
import ModalNotes from "./ModalNotes";
import { Pencil, Trash2 } from "lucide-react";

const Notes = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<{
    id: string;
    title: string;
    text: string;
  } | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { notes, loading, error } = useSelector(
    (state: RootState) => state.notes
  );

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleAddNote = async () => {
    if (!title.trim() || !text.trim()) return;
    try {
      await dispatch(addNote({ title, text }));
      console.log("Note add");

      setTitle("");
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditNote = async (
    id: string,
    updatedTitle: string,
    updatedText: string
  ) => {
    try {
      await dispatch(editNote({ id, title: updatedTitle, text: updatedText }));
      closeModal();
    } catch (err) {
      console.error("Error editing note:", err);
    }
  };

  const handleDeleteNote = (id: string) => {
    dispatch(deleteNote(id));
  };

  const openModal = (note: { _id: string; title: string; text: string }) => {
    setSelectedNote({ id: note._id, title: note.title, text: note.text });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNote(null);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="p-4">Add a note:</h2>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border rounded p-2"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Text"
          className="border rounded p-2"
        />
        <button
          onClick={handleAddNote}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 cursor-pointer"
        >
          Add Note
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <h2>Notes List:</h2>
      <ul className="list-disc mt-4 w-full max-w-md">
        {notes.map((note) => (
          <li
            key={note._id}
            className="flex justify-between items-center gap-4"
          >
            <div>
              <h3 className="font-bold">{note.title}</h3>
              <p>{note.text}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openModal(note)}
                // className="text-blue-600 hover:underline"
              >
                <Pencil
                  size={18}
                  className="hover:text-gray-600 cursor-pointer"
                />
              </button>
              <button
                onClick={() => handleDeleteNote(note._id)}
                // className="text-red-600 hover:underline"
              >
                <Trash2
                  size={18}
                  className="hover:text-red-500 cursor-pointer"
                />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && selectedNote && (
        <ModalNotes
          closeModal={closeModal}
          onSave={(updatedTitle, updatedText) =>
            (() => handleEditNote(selectedNote.id, updatedTitle, updatedText))()
          }
          currentTitle={selectedNote.title}
          currentText={selectedNote.text}
        />
      )}
    </div>
  );
};

export default Notes;
