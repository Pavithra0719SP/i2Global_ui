"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/store/hook";
import { deleteNote } from "../notesService/notesService";
import ConfirmationDialog from "@/app/common/components/confirmationDialog";

const NotesList = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const notes = useAppSelector((state) => state.notes);
  const noteList = notes.notes || [];

  const [message, setMessage] = useState<string | null>(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteNoteId, setDeleteNoteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleEdit = (note: any) => {
    router.push(`/portal/notes/editnotes/${note.note_id}`);
  };

  const handleView = (note: any) => {
    router.push(`/portal/notes/notesView/${note.note_id}`);
  };

  const handleCreateNote = () => {
    router.push("/portal/notes/create");
  };

  const handleDeleteClick = (noteId: string) => {
    setDeleteNoteId(noteId);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteNoteId) return;
    try {
      setIsLoading(true);
      await dispatch(deleteNote(deleteNoteId));
      setMessage("Note deleted!");
    } catch (error) {
      setMessage("Error deleting note. Please try again.");
    } finally {
      setIsLoading(false);
      setShowDeleteConfirm(false);
      setDeleteNoteId(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setDeleteNoteId(null);
  };

  return (
    <div className="pr-8 pl-8 pt-14">
      <div className="flex justify-between items-center mb-6 mt-8">
        <h1 className="text-3xl font-bold">Your Notes</h1>
      </div>

      {noteList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {noteList.map((note: any) => (
            <div
              key={note.note_id}
              className="p-4 bg-white shadow rounded-lg relative hover:shadow-md transition-shadow"
            >
              <h3
                className="font-semibold text-lg cursor-pointer hover:text-blue-600 transition-colors pr-16"
                onClick={() => handleView(note)}
              >
                {note.note_title}
              </h3>
              <p
                className="text-sm mt-1 text-gray-600 cursor-pointer line-clamp-3"
                onClick={() => handleView(note)}
              >
                {note.note_content}
              </p>

              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  className="text-blue-500 hover:text-blue-700 transition-colors p-1"
                  onClick={() => handleEdit(note)}
                  title="Edit note"
                >
                  <AiOutlineEdit size={16} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700 transition-colors p-1"
                  onClick={() => handleDeleteClick(note.note_id)}
                  title="Delete note"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 
                      002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 
                      0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 
                      11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 
                      0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-3 text-xs text-gray-400">
                Click to view full note
              </div>
            </div>
          ))}
        </div>
      ) : notes.loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No notes yet.</p>
          <button
            onClick={handleCreateNote}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your First Note
          </button>
        </div>
      )}

      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-110 hover:bg-blue-700 transition-all"
        onClick={handleCreateNote}
        title="Create new note"
      >
        <AiOutlinePlus size={24} />
      </button>

      {message && (
        <div className="fixed top-[650px] left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-lg border border-green-500 text-green-700 px-6 py-4 rounded-xl shadow-xl animate-slide-in z-50">
          <div className="flex items-center justify-center text-center">
            <span className="text-sm font-semibold">{message}</span>
          </div>
        </div>
      )}

      <ConfirmationDialog
        open={showDeleteConfirm}
        title="Delete Note"
        message="Are you sure you want to delete this note? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmVariant="danger"
        icon="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        loading={isLoading}
      />
    </div>
  );
};

export default NotesList;
