import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchTodos, addTodo, deleteTodo } from "../slices/TodosSlice";
import { Pencil, Save, Trash2 } from "lucide-react";

const Todo = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { todos, loading, error } = useSelector(
    (state: RootState) => state.todos
  );

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = async () => {
    if (!task.trim()) return;
    try {
      await dispatch(addTodo(task));
      setTask("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="p-4">Add a task to your TODO list:</h2>
      <div className="flex items-center px-8 gap-4">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="your task ..."
            className="border rounded-2xl px-4 py-2"
          />
        </form>
        <button
          onClick={handleAddTodo}
          className="border rounded-2xl bg-gray-700 p-2 cursor-pointer hover:bg-gray-300 hover:text-gray-800 hover:border-white"
        >
          Add <span className="max-[720px]:hidden">task</span>
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ol className="list-decimal mt-4">
        {todos.map((todo, index) => (
          <li key={todo._id} className="flex justify-between gap-3">
            <div>
              <span>{index + 1}. </span>
              <span>{todo.title}. </span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleDeleteTodo(todo._id)}
                className="cursor-pointer"
              >
                <Trash2 size={18} className="hover:text-red-500" />
              </button>
              {isModalOpen ? (
                <div className="flex">
                  <form>
                    <input type="text" placeholder="edit todo ..." />
                  </form>
                  <button>
                    <Save />
                  </button>
                </div>
              ) : (
                <button className="cursor-pointer" onClick={openModal}>
                  <Pencil size={18} className="hover:text-gray-600" />
                </button>
              )}
            </div>
          </li>
        ))}
      </ol>
      {/* 📦 Модальне вікно */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/85 z-50">
          <div className="flex  flex-col items-center bg-gray-700 p-6 rounded-2xl shadow-lg min-w-[300px]">
            <h3 className="text-lg font-bold mb-4">Edit Todo</h3>
            <div className="flex p-4">
              <form>
                <input
                  type="text"
                  placeholder="edit task ..."
                  className="border rounded-2xl p-2 outline-white"
                />
              </form>
              {/* <button>
                <Save />
              </button> */}
            </div>
            <div className="flex justify-end gap-2">
              <button className="bg-blue-600 text-white px-6 py-1 rounded cursor-pointer hover:bg-blue-800">
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
      )}
    </div>
  );
};

export default Todo;
