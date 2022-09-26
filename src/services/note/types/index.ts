import { FilterQuery } from "mongoose";
import { Note, User, PaginateQueryProps } from "../../../types";

export type IsPrivateNote = (note?: Note) => boolean;
export type IsNoteAuthor = (user?: User, note?: Note) => boolean;
export type IsNoteEditor = (user?: User, note?: Note) => boolean;
export type IsNoteCollaborator = (user?: User, note?: Note) => boolean;
export type IsAuthorizedToViewNote = (note?: Note, user?: User) => boolean;

// export type DeleteNote = (note: Note) => any;

export interface GetNoteProps {
  noteId: string;
  user: User | null;
}

export interface GetNotesProps {
  authorId?: string;
  query?: FilterQuery<Note>;
  user: User | null;
}

export interface CreateNoteQueryFilter {
  userId: string;
  note: Partial<Note>;
}

export interface DeleteNoteQueryFilter {
  noteId: string;
  userId: string;
}

export interface UpdateNoteQueryFilter {
  noteId: string;
  userId: string;
  noteDetails: Partial<Note>;
}