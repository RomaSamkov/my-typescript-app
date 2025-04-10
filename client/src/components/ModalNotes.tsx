import { useState } from "react";

type Props = {
  closeModal: () => void;
  onSave: (updatedTitle: string, updatedText: string) => void;
  currentTitle: string;
  currentText: string;
};

const ModalNotes = ({
  closeModal,
  onSave,
  currentTitle,
  currentText,
}: Props) => {
  const [newTitle, setNewTitle] = useState(currentTitle);
  const [newText, setNewText] = useState(currentText);

  const handleSave = () => {
    if (newTitle.trim() && newText.trim()) {
      onSave(newTitle, newText);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/85 z-50">
      <div className="bg-gray-600 p-6 rounded shadow-lg w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Edit Note</h3>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Title"
          className="border rounded p-2 w-full mb-4"
        />
        <textarea
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Text"
          className="border rounded p-2 w-full mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
          >
            Save
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalNotes;
