"use client";

import React from "react";
import { NotesProps } from "../interface/interface";
import CommonInput from "@/app/common/components/commonInput";
import CommonButton from "@/app/common/components/commonButton";
import CommonTextarea from "@/app/common/components/commonTextarea";

const Notes: React.FC<NotesProps> = ({
  open,
  onClose,
  value,
  onValueChange,
  onAdd,
  isEditing,
  onSave,
  onDelete,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
      <div className="w-[90%] md:w-1/2 bg-white/20 backdrop-blur-xl border border-white/30 p-6 rounded-2xl shadow-xl transition-all transform scale-100 animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white drop-shadow-md">
            {isEditing ? "Edit Note" : "Create a Note"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-white text-xl hover:scale-110 transition-transform"
          >
            ✖
          </button>
        </div>

        <hr className="mb-4 border-white/40" />

        <CommonInput
          type="text"
          placeholder="Title"
          value={value.note_title}
          onChange={(e) => onValueChange("note_title", e.target.value)}
          className="p-3 bg-transparent border border-white/40 text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400 outline-none mb-4"
        />

        <CommonTextarea
          placeholder="Write your note..."
          rows={4}
          value={value.note_content}
          onChange={(e) => onValueChange("note_content", e.target.value)}
        />

        <div className="flex justify-end gap-4 mt-6">
          {isEditing ? (
            <>
              <CommonButton label="Save" onClick={onSave} variant="primary" />
              <CommonButton
                label="Delete"
                onClick={onDelete}
                variant="danger"
              />
            </>
          ) : (
            <>
              <CommonButton
                label="Add Note"
                onClick={onAdd}
                variant="success"
              />
              <CommonButton
                label="Cancel"
                onClick={onClose}
                variant="secondary"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;