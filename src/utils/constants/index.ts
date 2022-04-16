import {
  NoteVisibility,
  ThemePreference,
  SessionErrorMessage,
  NoteSorting,
  CollaboratorRole
} from "../../types";

const { NODE_ENV } = process.env;

export const isDevelopment = NODE_ENV === "development";
export const DEFAULT_SERVER_ERROR_MESSAGE = "Oops! Something went wrong! :(";

// Sessions
export const SESSION_EXPIRED_MESSAGE: SessionErrorMessage = 'Session Expired';
export const SESSION_INVALID_MESSAGE: SessionErrorMessage = 'Invalid Session';

// Note
export const DEFAULT_NOTE_SORTING: NoteSorting = 'updatedAt';
export const DEFAULT_THEME_PREFERENCE: ThemePreference = 'system';
export const DEFAULT_NOTE_VISIBILITY: NoteVisibility = 'private';

// id
export const INVALID_ID_ERROR_MESSAGE = 'invalid identifier';

// Collaborator
export const DEFAULT_COLLABORATOR_LIMIT = 10;
export const DEFAULT_COLLABORATOR_ROLE: CollaboratorRole = 'viewer';

// query pagination
export const PAGINATION_LIMIT = 100;
export const PAGINATION_INITIAL_PAGE = 1;