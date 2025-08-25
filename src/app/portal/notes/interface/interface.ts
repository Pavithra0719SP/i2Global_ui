export interface NotesProps {
  open: boolean;
  onClose: () => void;
  value: { note_title: string; note_content: string };
  onValueChange: (field: "note_title" | "note_content", val: string) => void;
  onAdd?: () => void;
  isEditing: boolean;
  onSave: () => void;
  onDelete: () => void;
}
export interface Note {
  note_id: string;
  createdAt: string;
  note_title: string;
  note_content: string;
}

export interface State {
  notes: Note[];
  open: boolean;
  isEditing: boolean;
  currentIndex: number | null;
  value: { note_title: string; note_content: string };
}

export interface UseNotesProps {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
  onMessage: React.Dispatch<React.SetStateAction<string>>;
}
