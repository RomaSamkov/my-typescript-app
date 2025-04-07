import { Save } from "lucide-react";

type Props = {
  closeModal: () => void;
};

const Modal = ({ closeModal }: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800/85 z-50">
      <div className="bg-gray-600 p-6 rounded shadow-lg min-w-[300px]">
        <h3 className="text-lg font-bold mb-4">Редагувати тудушку</h3>
        <div className="flex">
          <form>
            <input
              type="text"
              placeholder="edit todo ..."
              className="border rounded-2xl"
            />
          </form>
          <button>
            <Save />
          </button>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={closeModal}
            className="bg-gray-300 px-4 py-1 rounded"
          >
            Скасувати
          </button>
          <button className="bg-blue-500 text-white px-4 py-1 rounded">
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
