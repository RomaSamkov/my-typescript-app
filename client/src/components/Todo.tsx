import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  fetchTodos,
  addTodo,
  deleteTodo,
  editTodo,
  TodoType,
} from "../slices/TodosSlice";
import { Pencil, Trash2 } from "lucide-react";
import Modal from "./Modal";

const Todo = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);
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

  const handleEditTodo = async (id: string, updatedTitle: string) => {
    try {
      await dispatch(editTodo({ id, title: updatedTitle }));
      closeModal();
    } catch (err) {
      console.error("Error editing todo:", err);
    }
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const openModal = (todo: TodoType) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedTodo(null);
    setIsModalOpen(false);
  };

  const handleToggleCompleted = async (id: string, isCompleted: boolean) => {
    try {
      await dispatch(editTodo({ id, isCompleted: !isCompleted }));
    } catch (err) {
      console.error("Error toggling todo status:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="p-4">Add a task to your TODO list:</h2>
      <div className="flex flex-col items-center px-8 gap-4">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="your task ..."
            className="border rounded-2xl px-4 py-2 w-[300px] outline-amber-100"
          />
        </form>
        <button
          onClick={handleAddTodo}
          className="border rounded-2xl bg-gray-700 p-2 cursor-pointer hover:bg-gray-300 hover:text-gray-800 hover:border-white w-[300px]"
        >
          Add <span className="max-[720px]:hidden">task</span>
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ol className="list-decimal mt-4">
        {todos.map((todo, index) => (
          <li key={todo._id} className="flex justify-between gap-3">
            <div className="flex items-center gap-2">
              <span>{index + 1}. </span>
              <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                checked={todo.isCompleted}
                onChange={() =>
                  handleToggleCompleted(todo._id, todo.isCompleted)
                }
              />
              <span
                className={todo.isCompleted ? "line-through text-gray-500" : ""}
              >
                {todo.title.trim()}.
              </span>
            </div>

            <div className="flex gap-4">
              <button
                className="cursor-pointer"
                onClick={() => openModal(todo)}
              >
                <Pencil size={18} className="hover:text-gray-600" />
              </button>
              <button
                onClick={() => handleDeleteTodo(todo._id)}
                className="cursor-pointer"
              >
                <Trash2 size={18} className="hover:text-red-500" />
              </button>
            </div>
          </li>
        ))}
      </ol>
      {/* 📦 Modal window */}
      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          onSave={(updatedTitle) =>
            selectedTodo && handleEditTodo(selectedTodo._id, updatedTitle)
          }
          currentTitle={selectedTodo?.title || ""}
        />
      )}
    </div>
  );
};

export default Todo;
