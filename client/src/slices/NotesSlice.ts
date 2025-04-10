import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type NoteType = {
  _id: string;
  title: string;
  text: string;
};

type NotesState = {
  notes: NoteType[];
  loading: boolean;
  error: string | null;
};

const initialState: NotesState = {
  notes: [],
  loading: false,
  error: null,
};

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const response = await fetch("http://localhost:3000/api/notebook/notes");
  const data = await response.json();
  return data.data; // Assuming the API returns notes in `data`
});

export const addNote = createAsyncThunk(
  "notes/addNote",
  async (note: { title: string; text: string }) => {
    const response = await fetch(
      "http://localhost:3000/api/notebook/notes/add",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      }
    );
    const data = await response.json();
    return data.data;
  }
);

export const editNote = createAsyncThunk(
  "notes/editNote",
  async ({ id, title, text }: { id: string; title: string; text: string }) => {
    const response = await fetch(
      `http://localhost:3000/api/notebook/notes/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, text }),
      }
    );
    const data = await response.json();
    return data.data;
  }
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id: string) => {
    await fetch(`http://localhost:3000/api/notebook/notes/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch notes";
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(editNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex(
          (note) => note._id === action.payload._id
        );
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note._id !== action.payload);
      });
  },
});

export default notesSlice.reducer;
