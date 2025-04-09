import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export type TodoType = {
  _id: string;
  title: string;
  isCompleted: boolean;
};

type TodoState = {
  todos: TodoType[];
  loading: boolean;
  error: string | null;
};

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

// Async thunk to fetch todos
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await fetch("http://localhost:3000/api/notebook/todos");
  const json = await res.json();
  return json.data as TodoType[];
});

// Async thunk to add a todo
export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (title: string) => {
    const res = await fetch("http://localhost:3000/api/notebook/todos/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      throw new Error("Failed to add todo");
    }

    const json = await res.json();
    return json.data as TodoType;
  }
);

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async ({
    id,
    title,
    isCompleted,
  }: {
    id: string;
    title?: string;
    isCompleted?: boolean;
  }) => {
    const res = await fetch(`http://localhost:3000/api/notebook/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, isCompleted }),
    });

    if (!res.ok) {
      throw new Error("Failed to edit todo");
    }

    const json = await res.json();
    return json.data as TodoType; // Повертаємо оновлену тудушку
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/notebook/todos/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete todo");
    }

    return id; // Return the id of the deleted todo
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchTodos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTodos.fulfilled,
        (state, action: PayloadAction<TodoType[]>) => {
          state.loading = false;
          state.todos = action.payload;
        }
      )
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })

      // addTodo
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<TodoType>) => {
        state.todos.push(action.payload);
      })
      .addCase(editTodo.fulfilled, (state, action: PayloadAction<TodoType>) => {
        const index = state.todos.findIndex(
          (todo) => todo._id === action.payload._id
        );
        if (index !== -1) {
          state.todos[index] = action.payload; // Оновлюємо тудушку в списку
        }
      })
      // deleteTodo
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      });
  },
});

export default todosSlice.reducer;
