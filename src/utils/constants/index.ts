import { NoteVisibility, ThemePreference } from "../../types";

const { NODE_ENV } = process.env;

export const PAGINATION_LIMIT = 100;
export const PAGINATION_INITIAL_PAGE = 1;
export const isDevelopment = NODE_ENV === "development";
export const DEFAULT_NOTE_VISIBILITY = NoteVisibility.PUBLIC;
export const DEFAULT_THEME_PREFERENCE = ThemePreference.SYSTEM;
export const DEFAULT_SERVER_ERROR_MESSAGE = "Oops! Something went wrong! :(";