import { useState } from "react";

interface TodoType {
  id: number;
  title: string;
  isCompleted: false;
}

const Todo = () => {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<TodoType[]>([]);

  const addNewTask = () => {
    if (!task.trim()) return;
    setTodos([...todos, { id: Date.now(), title: task, isCompleted: false }]);
    setTask("");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="p-4">Add a task to your TODO list:</h2>
      <div className="flex items-center px-8">
        <form className="">
          <label htmlFor="todo"></label>
          <input
            type="text"
            id="todo"
            name="todo"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="your task ..."
            className="border rounded-2xl px-4 py-2"
          />
        </form>
        <button
          className="border rounded-2xl bg-gray-700 p-2 cursor-pointer hover:bg-gray-300 hover:text-gray-800 hover:border-white"
          onClick={addNewTask}
        >
          Add <span className="max-[720px]:hidden">task</span>
        </button>
      </div>
      <ol className="list-decimal">
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ol>
    </div>
  );
};

export default Todo;
