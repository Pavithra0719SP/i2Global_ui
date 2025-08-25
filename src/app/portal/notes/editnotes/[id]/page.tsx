"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/store/hook";
import { deleteNote, updateNote, getNoteById } from "../../notesService/notesService";
import { clearCurrentNote, clearError } from "../../notesService/notesSlice";
import NoteForm from "../../components/notesUi";

const EditNotePage = () => {
    const router = useRouter();
    const params = useParams();
    const dispatch = useAppDispatch();
    const { currentNote, loading, error } = useAppSelector((state) => state.notes);

    const noteId = params?.id as string;
    const [message, setMessage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        dispatch(clearCurrentNote());
        dispatch(clearError());
        return () => {
            dispatch(clearCurrentNote());
        };
    }, [dispatch]);

    useEffect(() => {
        if (noteId) {
            dispatch(getNoteById(noteId));
        }
    }, [dispatch, noteId]);

    useEffect(() => {
        if (error) {
            setMessage(error);
        }
    }, [error]);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
                dispatch(clearError());
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [message, dispatch]);

    const handleSubmit = async (formData: { note_title: string; note_content: string }) => {
        if (!formData.note_title.trim() || !formData.note_content.trim()) {
            setMessage("Please fill in both title and content");
            return;
        }

        setIsProcessing(true);
        try {
            await dispatch(updateNote({
                id: noteId,
                note: formData
            })).unwrap();

            setMessage("Note updated successfully!");

            setTimeout(() => {
                router.push("/portal/notes");
            }, 1500);

        } catch (error: any) {
            setMessage(error.message || "Error updating note. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDelete = async () => {
        if (isProcessing) return;

        try {
            setIsProcessing(true);
            await dispatch(deleteNote(noteId)).unwrap();
            setMessage("Note deleted successfully!");

            setTimeout(() => {
                router.push("/portal/notes");
            }, 1500);

        } catch (error: any) {
            setMessage(error.message || "Failed to delete note. Please try again.");
            setIsProcessing(false);
        }
    };

    // Loading state
    if (loading && !currentNote) {
        return (
            <div className="pr-8 pl-8 pt-14 max-w-4xl mx-auto">
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-lg text-gray-700">Loading note...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!loading && !currentNote) {
        return (
            <div className="pr-8 pl-8 pt-14 max-w-4xl mx-auto">
                <div className="mb-6">
                    <button
                        onClick={() => router.push("/portal/notes")}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        ← Back to Notes
                    </button>
                </div>

                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <div className="mb-4">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Note not found</h3>
                        <p className="text-gray-500 mb-6">The note you're looking for doesn't exist or may have been deleted.</p>
                        <button
                            onClick={() => router.push("/portal/notes")}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <NoteForm
            mode="edit"
            initialData={{
                note_title: currentNote?.note_title || "",
                note_content: currentNote?.note_content || ""
            }}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            isLoading={isProcessing}
            message={message}
        />
    );
};

export default EditNotePage;