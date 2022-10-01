import { ClientSession } from "mongoose";
import { User, Collaborator } from "../../../types";

export interface GetCollaboratorProps {
  noteId: string;
}

export interface CreateCollaboratorProps {
  collaboratorData: Partial<Pick<Collaborator, "noteId" | "role">>;
  session?: ClientSession;
  creator: User;
  user: User;
}

export interface CreateCollaboratorsProps {
  collaboratorsData: (Partial<Pick<Collaborator, "noteId" | "role">>)[];
  session?: ClientSession;
  creator: User;
  user: User;
}

export interface DeleteCollaboratorProps {
  collaboratorId: string;
  session?: ClientSession;
  noteId: string;
}

export interface DeleteCollaboratorsProps {
  collaboratorsId: string[];
  session?: ClientSession;
  noteId: string;
}

// 

export interface NewCollaboratorProps {
  collaboratorData: Partial<Pick<Collaborator, "noteId" | "role">>;
  creator: User;
  user: User;
}