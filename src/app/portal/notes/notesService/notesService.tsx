import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Note } from "./notesSlice";
import { BASE_URL } from "@/app/common/url/url";
import { getAuthHeaders } from "@/app/common/authToken/authToken";



export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const response = await axios.get(`${BASE_URL}/getall/notes`, {
    headers: getAuthHeaders(),
  });
  return response.data;
});

export const addNote = createAsyncThunk(
  "notes/addNote",
  async (note: Omit<Note, "note_id">) => {
    const response = await axios.post<Note>(
      `${BASE_URL}/notes/create`,
      note,
      { headers: getAuthHeaders() }
    );
    return response.data;
  }
);

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ id, note }: { id: string; note: Omit<Note, "note_id"> }) => {
    const response = await axios.put<Note>(
      `${BASE_URL}/notes/update/${id}`,
      note,
      { headers: getAuthHeaders() }
    );
    return response.data;
  }
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id: string) => {
    await axios.delete(`${BASE_URL}/notes/delete/${id}`, {
      headers: getAuthHeaders(),
    });
    return id;
  }
);

export const getNoteById = createAsyncThunk(
  "notes/getNoteById",
  async (id: string) => {
    const response = await axios.get<Note>(
      `${BASE_URL}/notes/getbyid/${id}`,
      { headers: getAuthHeaders() }
    );
    return response;
  }
);
