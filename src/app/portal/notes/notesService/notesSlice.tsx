import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { addNote, deleteNote, fetchNotes, updateNote, getNoteById } from "./notesService";

export interface Note {
  note_id: string;
  note_title: string;
  note_content: string;
  createdAt?: string;
}

interface NotesState {
  notes: Note[];
  currentNote: Note | null;
  loading: boolean;
  error: string | null;
}

const initialState: NotesState = {
  notes: [],
  currentNote: null,
  loading: false,
  error: null,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    clearCurrentNote: (state) => {
      state.currentNote = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Notes
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.notes = action.payload.notes || action.payload.data?.notes || action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch notes";
      })

      .addCase(getNoteById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNoteById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        let noteData;
        if (action.payload.data?.note) {
          noteData = action.payload.data.note;
        } else if (action.payload.data?.data?.note) {
          noteData = action.payload.data.data.note;
        } else if (action.payload.data?.data) {
          noteData = action.payload.data.data;
        } else if (action.payload.data) {
          noteData = action.payload.data;
        } else {
          noteData = action.payload;
        }
        state.currentNote = noteData;
      })
      .addCase(getNoteById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch note";
        state.currentNote = null;
      })

      .addCase(addNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNote.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const newNote = action.payload.note || action.payload.data?.note || action.payload;
        state.notes.push(newNote);
      })
      .addCase(addNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add note";
      })

      .addCase(updateNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNote.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const updatedNote = action.payload.note || action.payload.data?.note || action.payload;

        const index = state.notes.findIndex(
          (n) => n.note_id === updatedNote.note_id
        );
        if (index !== -1) {
          state.notes[index] = updatedNote;
        }
        if (state.currentNote && state.currentNote.note_id === updatedNote.note_id) {
          state.currentNote = updatedNote;
        }
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update note";
      })
      .addCase(deleteNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.notes = state.notes.filter(
          (note) => note.note_id !== action.payload
        );
        if (state.currentNote && state.currentNote.note_id === action.payload) {
          state.currentNote = null;
        }
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete note";
      });
  },
});

export const { clearCurrentNote, clearError } = notesSlice.actions;
export default notesSlice.reducer;