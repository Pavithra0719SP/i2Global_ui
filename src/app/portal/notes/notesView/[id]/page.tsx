"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { AiOutlineArrowLeft, AiOutlineEdit, AiOutlineDelete, AiOutlineEye, AiOutlineCalendar } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/app/store/hook";
import { deleteNote, getNoteById } from "../../notesService/notesService";
import { clearCurrentNote, clearError } from "../../notesService/notesSlice";
import ConfirmationDialog from "@/app/common/components/confirmationDialog";

const ViewNotePage = () => {
    const router = useRouter();
    const params = useParams();
    const dispatch = useAppDispatch();
    const { currentNote, loading, error } = useAppSelector((state) => state.notes);

    const noteId = params?.id as string;
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        dispatch(clearCurrentNote());
        dispatch(clearError());
        return () => {
            dispatch(clearCurrentNote());
        };
    }, [dispatch]);
   useEffect(() => {
        if (noteId) {
            console.log("Fetching note by ID:", noteId);
            dispatch(getNoteById(noteId));
        }
    }, [dispatch, noteId]);

    useEffect(() => {
        if (error) {
            setMessage(error);
        }
    }, [error]);

    useEffect(() => {
        if (message && !showDeleteConfirm) {
            const timer = setTimeout(() => {
                setMessage(null);
                dispatch(clearError());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, dispatch, showDeleteConfirm]);

    const handleBack = () => {
        dispatch(clearCurrentNote());
        router.push("/portal/notes");
    };

    const handleEdit = () => {
        router.push(`/portal/notes/editnotes/${noteId}`);
    };

    const handleDeleteClick = () => {
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = async () => {
        setShowDeleteConfirm(false);

        if (isProcessing) return;

        try {
            setIsProcessing(true);

            await dispatch(deleteNote(noteId)).unwrap();
            console.log("Delete successful");
            setMessage("Note deleted successfully!");
            setTimeout(() => {
                dispatch(clearCurrentNote());
                router.push("/portal/notes");
                router.refresh();
            }, 1500);

        } catch (error: any) {
            console.error("Error deleting note:", error);
            setMessage(error.message || "Failed to delete note. Please try again.");
            setIsProcessing(false);
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteConfirm(false);
    };

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return dateString;
        }
    };
    if (loading && !currentNote && !isProcessing) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-lg text-gray-700">Loading note...</p>
                </div>
            </div>
        );
    }
    if (!loading && !currentNote && !isProcessing) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="mb-4">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Note not found</h3>
                    <p className="text-gray-500 mb-6">The note you're looking for doesn't exist or may have been deleted.</p>
                    <button
                        onClick={handleBack}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto mt-8">
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={handleBack}
                        disabled={isProcessing}
                        className={`flex items-center transition-colors ${isProcessing
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-blue-600 hover:text-blue-800'
                            }`}
                    >
                        <AiOutlineArrowLeft size={20} className="mr-2" />
                        Back to Notes
                    </button>

                    <div className="flex items-center space-x-3">
                        <button
                            onClick={handleEdit}
                            disabled={isProcessing}
                            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <AiOutlineEdit className="mr-1" size={16} />
                            Edit
                        </button>
                        <button
                            onClick={handleDeleteClick}
                            disabled={isProcessing}
                            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <AiOutlineDelete className="mr-1" size={16} />
                            Delete
                        </button>
                    </div>
                </div>
                {currentNote && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-xl font-semibold text-gray-900 mb-1">Title : {currentNote.note_title}</h1>
                                    {currentNote.createdAt && (
                                        <div className="flex items-center text-gray-500 text-sm">
                                            <AiOutlineCalendar className="mr-1" size={14} />
                                            Created: {formatDate(currentNote.createdAt)}
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center">
                                    <AiOutlineEye className="text-gray-400" size={20} />
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-6">

                            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base">
                                Note Content :  {currentNote.note_content}
                            </div>
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
                    loading={isProcessing}
                />
                {message && !showDeleteConfirm && (
                    <div className={`fixed top-6 right-6 px-6 py-4 rounded-lg shadow-lg z-50 transition-all duration-300 ${message.includes("success")
                        ? "bg-green-100 border border-green-500 text-green-700"
                        : "bg-red-100 border border-red-500 text-red-700"
                        }`}>
                        <div className="flex items-center">
                            <span className="text-sm font-medium">{message}</span>
                            <button
                                onClick={() => setMessage(null)}
                                className="ml-3 text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}
                {isProcessing && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-center">Deleting note...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewNotePage;