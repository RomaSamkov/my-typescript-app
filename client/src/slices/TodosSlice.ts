import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  _id: string;
  title: string;
  isCompleted: boolean;
}

interface TodoState {
  todos: Todo[];
  status: "idle" | "loading" | "failed";
}

const initialState: TodoState = {
  todos: [],
  status: "idle",
};

export const fetchTodosAsync = createAsyncThunk(
  "todos/fetchTodos",
  async () => {
    const response = await fetch("http://localhost:3000/api/notebook/todos");
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    const { data } = await response.json();
    return data; // Повертаємо масив todo
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodo",
  async (title: string) => {
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
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchTodosAsync.fulfilled,
        (state, action: PayloadAction<Todo[]>) => {
          state.todos = action.payload;
          state.status = "idle";
        }
      )
      .addCase(fetchTodosAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addTodoAsync.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      });
  },
});

export default todoSlice.reducer;

// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// interface Todo {
//   _id: string;
//   title: string;
//   isCompleted: boolean;
// }

// interface TodoState {
//   todos: Todo[];
//   status: "idle" | "loading" | "failed";
// }

// const initialState: TodoState = {
//   todos: [],
//   status: "idle",
// };

// // Асинхронний екшен для додавання задачі
// export const addTodoAsync = createAsyncThunk(
//   "todos/addTodo",
//   async (title: string) => {
//     const response = await fetch(
//       "http://localhost:3000/api/notebook/todos/add",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ title }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to add todo");
//     }

//     return await response.json(); // Повертаємо додане завдання з сервера
//   }
// );

// const todoSlice = createSlice({
//   name: "todos",
//   initialState,
//   reducers: {
//     // Видаляємо локальний addTodo, оскільки тепер він працює через сервер
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(addTodoAsync.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(addTodoAsync.fulfilled, (state, action: PayloadAction<Todo>) => {
//         state.todos.push(action.payload);
//         state.status = "idle";
//       })
//       .addCase(addTodoAsync.rejected, (state) => {
//         state.status = "failed";
//       });
//   },
// });

// export default todoSlice.reducer;
