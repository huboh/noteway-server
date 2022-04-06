import { context } from "..";
import { Express } from "express";
import { Model, FilterQuery } from 'mongoose';
import { ApolloServer } from "apollo-server-express";

export type AuthType = 'Bearer' | 'Basic';

export type NoteVisibility = 'public' | 'private';

export type Context = Awaited<ReturnType<typeof context>>;

export type Resolvers<S, A, C, I> = { [T: string]: (source: S, argument: A, context: C, info: I) => unknown; };

export const enum ThemePreference {
  DARK = 'dark',
  LIGHT = 'light',
  SYSTEM = 'system'
}

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
  username?: string;
}

export interface GetUserQueryFilter {
  id?: string;
  email?: string;
  username?: string;
}

export interface DeleteUserQueryFilter {
  id?: string;
  email?: string;
  username?: string;
}

export interface GetNoteQueryFilter {
  id?: string;
  userId: string;
}

export interface GetNotesQueryFilter<T> extends Omit<GetNoteQueryFilter, 'id'>, Pick<PaginateQueryProps<T>, 'page' | 'limit'> {
  authorId?: string;
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
  note: Partial<Note>;
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

export interface Tag {
  color: string;
  label: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  avatarUrl: string;
  isEmailVerified: boolean;
  preferences: {
    theme: string;
  };
}

export interface Note {
  id: string;
  tag: Tag;
  title: string;
  content: string;
  authorId: string;
  isPrivate: boolean;
  isArchived: boolean;
  visibility: NoteVisibility;
}