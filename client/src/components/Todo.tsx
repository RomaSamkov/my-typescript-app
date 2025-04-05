import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchTodos, addTodo, deleteTodo } from "../slices/TodosSlice";
import { Trash2 } from "lucide-react";

const Todo = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch<AppDispatch>();
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

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="p-4">Add a task to your TODO list:</h2>
      <div className="flex items-center px-8">
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

            <button
              onClick={() => handleDeleteTodo(todo._id)}
              className="cursor-pointer"
            >
              <Trash2 size={18} className="hover:text-red-500" />
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Todo;
