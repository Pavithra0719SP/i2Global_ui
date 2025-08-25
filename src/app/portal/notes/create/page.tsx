"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/store/hook";
import { addNote } from "../notesService/notesService";
import NoteForm from "../components/notesUi";

const CreateNotePage = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleSubmit = async (formData: { note_title: string; note_content: string }) => {
        if (!formData.note_title.trim() || !formData.note_content.trim()) {
            setMessage("Please fill in both title and content");
            return;
        }

        setIsLoading(true);
        try {
            await dispatch(addNote(formData));
            setMessage("Note created successfully!");
            setTimeout(() => {
                router.push("/portal/notes");
            }, 1500);

        } catch (error) {
            setMessage("Error creating note. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <NoteForm
            mode="create"
            onSubmit={handleSubmit}
            isLoading={isLoading}
            message={message}
        />
    );
};

export default CreateNotePage;