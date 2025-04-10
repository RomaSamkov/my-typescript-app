import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./slices/TodosSlice";
import notesReducer from "./slices/NotesSlice";

export const store = configureStore({
  reducer: { todos: todosReducer, notes: notesReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
