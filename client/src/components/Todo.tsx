// import { useState, useEffect } from "react";
// import { addTodoAsync, fetchTodosAsync } from "../slices/TodosSlice";
// import { useAppDispatch, useAppSelector } from "../hooks";

// interface TodoType {
//   _id: string;
//   title: string;
//   isCompleted: boolean;
// }

// const Todo = () => {
//   const [task, setTask] = useState<string>("");
//   const dispatch = useAppDispatch();
//   const todos = useAppSelector((state) => state.todos.todos); // Отримуємо todos із Redux
//   const status = useAppSelector((state) => state.todos.status);

//   useEffect(() => {
//     dispatch(fetchTodosAsync()); // Завантажуємо todos при старті компонента
//   }, [dispatch]);

//   const addNewTask = async () => {
//     if (!task.trim()) return;
//     await dispatch(addTodoAsync(task));
//     setTask("");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <h2 className="p-4">Add a task to your TODO list:</h2>
//       <div className="flex items-center px-8">
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             addNewTask();
//           }}
//         >
//           <label htmlFor="todo"></label>
//           <input
//             type="text"
//             id="todo"
//             name="todo"
//             value={task}
//             onChange={(e) => setTask(e.target.value)}
//             placeholder="your task ..."
//             className="border rounded-2xl px-4 py-2"
//           />
//         </form>
//         <button
//           className="border rounded-2xl bg-gray-700 p-2 cursor-pointer hover:bg-gray-300 hover:text-gray-800 hover:border-white"
//           onClick={addNewTask}
//         >
//           Add <span className="max-[720px]:hidden">task</span>
//         </button>
//       </div>

//       {status === "loading" && <p>Loading...</p>}
//       {status === "failed" && (
//         <p className="text-red-500">Failed to load todos</p>
//       )}

//       <ol className="list-decimal">
//         {todos.map((todo: TodoType) => (
//           <li key={todo._id}>{todo.title}</li>
//         ))}
//       </ol>
//     </div>
//   );
// };

// export default Todo;

import { useEffect, useState } from "react";

interface TodoType {
  _id?: number;
  title: string;
  isCompleted: false;
}

// interface TodoResponse {
//   data: TodoType[];
// }

const Todo = () => {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<TodoType[]>([]);

  const addNewTask = async () => {
    if (!task.trim()) return;
    // setTodos([...todos, { title: task, isCompleted: false }]);
    try {
      const newTodo = await addTodo(task);
      setTodos((prev) => [...prev, newTodo]);
      setTask("");
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async (title: string) => {
    const response = await fetch(
      "http://localhost:3000/api/notebook/todos/add",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add todo");
    }

    return await response.json(); // Повертаємо додане завдання з `_id`
  };

  const fetchAllTodos = async () => {
    const response = await fetch("http://localhost:3000/api/notebook/todos");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const { data } = await response.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="p-4">Add a task to your TODO list:</h2>
      <div className="flex items-center px-8">
        <form className="" onSubmit={(e) => e.preventDefault()}>
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
          <li key={todo._id}>{todo.title}</li>
        ))}
      </ol>
    </div>
  );
};

export default Todo;
