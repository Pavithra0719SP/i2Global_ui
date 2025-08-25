// components/NoteForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ConfirmationDialog from "@/app/common/components/confirmationDialog";

interface NoteFormProps {
    mode: "create" | "edit";
    initialData?: {
        note_title: string;
        note_content: string;
    };
    onSubmit: (formData: { note_title: string; note_content: string }) => Promise<void>;
    onDelete?: () => void;
    isLoading?: boolean;
    message?: string | null;
}

const NoteForm: React.FC<NoteFormProps> = ({
    mode,
    initialData,
    onSubmit,
    onDelete,
    isLoading = false,
    message
}) => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        note_title: initialData?.note_title || "",
        note_content: initialData?.note_content || ""
    });

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                note_title: initialData.note_title || "",
                note_content: initialData.note_content || ""
            });
        }
    }, [initialData]);

    const handleChange = (key: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.note_title.trim() || !formData.note_content.trim()) {
            return;
        }

        await onSubmit(formData);
    };

    const handleCancel = () => {
        router.push("/portal/notes");
    };

    const handleDeleteClick = () => {
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = () => {
        setShowDeleteConfirm(false);
        if (onDelete) {
            onDelete();
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteConfirm(false);
    };

    const isFormValid = formData.note_title.trim() && formData.note_content.trim();
    const pageTitle = mode === "create" ? "Create New Note" : "Edit Note";
    const submitButtonText = mode === "create"
        ? (isLoading ? "Creating..." : "Create Note")
        : (isLoading ? "Updating..." : "Update Note");

    return (
        <div className="pr-8 pl-8 pt-14 max-w-4xl mx-auto">
            <div className="mb-6">
                <button
                    onClick={handleCancel}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    disabled={isLoading}
                >
                    ← Back to Notes
                </button>
            </div>

            <h1 className="text-3xl font-bold mb-8 text-center">{pageTitle}</h1>

            <div className="bg-white shadow-lg rounded-lg p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="note_title" className="block text-sm font-medium text-gray-700 mb-2">
                            Note Title
                        </label>
                        <input
                            id="note_title"
                            type="text"
                            value={formData.note_title}
                            onChange={(e) => handleChange("note_title", e.target.value)}
                            placeholder="Enter note title..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label htmlFor="note_content" className="block text-sm font-medium text-gray-700 mb-2">
                            Note Content
                        </label>
                        <textarea
                            id="note_content"
                            value={formData.note_content}
                            onChange={(e) => handleChange("note_content", e.target.value)}
                            placeholder="Write your note content here..."
                            rows={10}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-vertical"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="flex gap-4 justify-end">
                        {mode === "edit" && onDelete && (
                            <button
                                type="button"
                                onClick={handleDeleteClick}
                                className="px-6 py-3 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                                disabled={isLoading}
                            >
                                Delete Note
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || !isFormValid}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {submitButtonText}
                        </button>
                    </div>
                </form>
            </div>

            {mode === "edit" && (
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
            )}

            {message && !showDeleteConfirm && (
                <div className={`fixed top-[650px] left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-lg border px-6 py-4 rounded-xl shadow-xl animate-slide-in z-50 ${message.includes("success") || message.includes("created") || message.includes("updated") || message.includes("deleted")
                    ? "border-green-500 text-green-700"
                    : "border-red-500 text-red-700"
                    }`}>
                    <div className="flex items-center justify-center text-center">
                        <span className="text-sm font-semibold">{message}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NoteForm;