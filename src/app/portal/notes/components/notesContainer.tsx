"use client";
import { useEffect } from "react";
import NotesList from "./noteList";
import { useAppDispatch } from "@/app/store/hook";
import { fetchNotes } from "../notesService/notesService";

function NotesListContainer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  return (
    <>
      <NotesList />
    </>
  );
}

export default NotesListContainer;
