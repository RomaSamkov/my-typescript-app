import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./slices/TodosSlice";
import notesReducer from "./slices/NotesSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: { todos: todosReducer, notes: notesReducer, auth: authReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
