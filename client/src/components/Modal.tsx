import { useState } from "react";

type Props = {
  closeModal: () => void;
  onSave: (updatedTitle: string) => void;
  currentTitle: string;
};

const Modal = ({ closeModal, onSave, currentTitle }: Props) => {
  const [newTitle, setNewTitle] = useState(currentTitle);

  const handleSave = () => {
    if (newTitle.trim()) {
      onSave(newTitle);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/85 z-50">
      <div className="flex  flex-col items-center bg-gray-700 p-6 rounded-2xl shadow-lg min-w-[300px]">
        <h3 className="text-lg font-bold mb-4">Edit Todo</h3>
        <div className="flex p-4">
          <form>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="edit task ..."
              className="border rounded-2xl p-2 outline-white"
            />
          </form>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-1 rounded cursor-pointer hover:bg-blue-800"
          >
            Save
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-500 px-4 py-1 rounded cursor-pointer hover:bg-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
