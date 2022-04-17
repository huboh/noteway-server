import { context } from "..";
import { Express } from "express";
import { Model, FilterQuery } from 'mongoose';
import { ApolloServer } from "apollo-server-express";

export type AuthType = 'Bearer' | 'Basic';

export type NoteVisibility = 'public' | 'private';

export type ThemePreference = 'dark' | 'light' | 'system';

export type NoteSorting = 'title' | 'createdAt' | 'updatedAt';

export type SessionErrorMessage = 'Session Expired' | 'Invalid Session';

export type CollaboratorRole = 'editor' | 'viewer' | 'commenter';

export type Context = Awaited<ReturnType<typeof context>>;

export type Resolvers<S, A, C, I> = { [T: string]: (source: S, argument: A, context: C, info: I) => unknown; };

export interface Token {
  userId: string;
}

export interface PaginateQueryProps<T> {
  page?: number;
  limit?: number;
  model: Model<T>;
  query: FilterQuery<T>;
}

export interface StartServerProps {
  app: Express;
  host: string;
  port: string | number;
  server?: ApolloServer;
}

export interface ConnectProps {
  /**
   * handler for `open` event, emitted when mongoose is connected to MongoDB, emitted after the `connected` event is emitted
   */
  onOpen?(): void;
  /**
   * handler for `close` event, emitted when `mongoose.connection.close()` is called
   */
  onClose?(): void;
  /**
   * handler for errors on initial connection & after initial connection has been established
   */
  onError?(error?: unknown): void;
  /**
   * handler for `disconnected` event, emitted when mongoose disconnects from MongoDB
   */
  onDisconnect?(): void;
}

/******** queries input **********/
export interface UserExistsQueryFilter {
  id?: string;
  email?: string;
  userId?: string;
  username?: string;
}

export interface GetUserQueryFilter {
  id?: string;
  email?: string;
  userId?: string;
  username?: string;
  includePassword?: boolean;
}

export interface DeleteUserQueryFilter {
  id?: string;
  userId?: string;
  loggedInUserId?: string;
}

export interface GetNoteQueryFilter {
  id?: string;
  userId: string;
  noteId: string;
}

export interface GetNotesQueryFilter<T> extends Omit<GetNoteQueryFilter, 'id' | 'noteId'>, Pick<PaginateQueryProps<T>, 'page' | 'limit'> {
  authorId?: string;
  query?: object;
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

export interface SignupCredentials {
  email?: string;
  username?: string;
  password: string;
}

export interface LoginCredentials {
  email?: string;
  username?: string;
  password: string;
}

export type NoteActivityAction =
  | 'created note'
  | 'updated note'
  | 'added attachment(s)'
  | 'removed attachment(s)'
  | 'added collaborator(s)'
  | 'removed collaborator(s)'
  | 'transferred ownership';

export interface GetNoteActivities {
  noteId: string;
}

export interface CreateNoteActivity {
  action: NoteActivityAction;
  initiator: string | User;
  noteId: string;
}

export interface DeleteNoteActivitiesProps {
  noteId: string;
  activitiesId: string | string[];
}

export interface CreateCollaboratorProps {
  userId: string;
  noteId: string;
  user: User;
  role: CollaboratorRole;
}

export interface DeleteCollaboratorProps {
  noteId: string;
  userId: string;
  collaboratorId: string;
}

export interface DeleteCollaboratorsProps {
  userId: string;
  noteId: string;
  collaboratorsId: string | string[];
}

export interface CreateNoteProps {
  note: Partial<Note>;
  author: User;
}

export interface CanViewNoteProps {
  note: Note;
  userId?: string;
}

/* data types */

export interface MongoDBObject {
  id: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}


export interface Tag extends MongoDBObject {
  color: string;
  label: string;
  tagId: string;
  userId: string;
}

export interface NoteActivity extends MongoDBObject {
  action: string;
  noteId: string;
  initiator: User;
  activityId: string;
}

export interface NoteAttachment extends MongoDBObject {
  noteId: string;
  fileType: string;
  fileSize: number;
}

export interface Collaborator extends MongoDBObject {
  /**
   * foreign key of this collaborator in the notes collection
   */
  noteId: string;
  /**
   *  foreign key of this collaborator in the users collection
   */
  userId: string;
  /**
   *  primary key of this collaborator
   */
  collaboratorId: string;
  /**
   *  reference to the user who added(created) this collaborator
   */
  createdBy: User;
  /**
   *  collaborators role
   */
  role: CollaboratorRole;
}

export interface User extends MongoDBObject {
  name: string | null;
  email: string;
  userId: string;
  username: string;
  password?: string | null;
  avatarUrl: string | null;
  isDeactivated: boolean;
  isEmailVerified: boolean;
  preferences: {
    theme: ThemePreference;
    sortNoteBy: NoteSorting;
  };
}

export interface Note extends MongoDBObject {
  tag: Tag;
  author: User;
  noteId: string;
  authorId: string;
  title: string;
  content: string;
  isPinned: boolean;
  isPrivate: boolean;
  isStarred: boolean;
  isArchived: boolean;
  isAddedToTrash: boolean;
  visibility: NoteVisibility;
  activities: NoteActivity[];
  attachments: NoteAttachment[];
  collaborators: Collaborator[];
  starredBy: User[];
}


// 

export type DeleteNote = (note: Note) => any;
export type IsPrivateNote = (note: Note) => boolean;
export type IsNoteAuthor = (user: User, note: Note) => boolean;
export type IsNoteEditor = (user: User, note: Note) => boolean;
export type IsNoteCollaborator = (user: User, note: Note) => boolean;
export type CanViewNote = (note: Note, user: User | null) => boolean;


export type DeleteAllNoteActivities = (note: Note) => any;
export type CreateUpdateActivity = (note: Note, user: User) => any;

export type DeleteNoteCollaborators = (note: Note, user: User) => any;



interface Identifiers {
  uuid?: unknown[];
  mongoId?: unknown[];
}

export type ValidateIdentifiers = (ids: Identifiers) => void | never;