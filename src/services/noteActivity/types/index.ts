import { ClientSession } from "mongoose";
import { User, NoteActivity } from "../../../types";

export type NoteActivityAction =
  | 'created note'
  | 'updated note'
  | 'added attachment(s)'
  | 'removed attachment(s)'
  | 'added collaborator(s)'
  | 'removed collaborator(s)'
  | 'transferred ownership'
  | 'unknown';

export interface GetNoteActivitiesProps {
  noteId: string;
}

export interface CreateNoteActivityProps {
  activityData: Partial<Pick<NoteActivity, "noteId" | "action"> & { action: NoteActivityAction; }>;
  initiator: User;
  session?: ClientSession;
}

export interface DeleteNoteActivitiesProps {
  activitiesId: string[];
  session?: ClientSession;
  noteId: string;
}

// 

export interface NewNoteActivityProps {
  activityData: Partial<Pick<NoteActivity, "noteId" | "action"> & { action: NoteActivityAction; }>;
  initiator: User;
}