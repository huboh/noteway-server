import { IsPrivateNote, IsNoteAuthor, IsNoteEditor, IsNoteCollaborator, IsAuthorizedToViewNote } from "../../types";

export const isPrivateNote: IsPrivateNote = (note) => {
  return !!note?.isPrivate;
};

export const isNoteAuthor: IsNoteAuthor = (user, note) => {
  return user?.userId === note?.authorId;
};

export const isNoteEditor: IsNoteEditor = (user, note) => {
  const collaborators = note?.collaborators || [];

  return Boolean(collaborators.find((collaborator) => {
    return (collaborator?.userId === user?.userId) && (collaborator?.role === 'editor');
  }));
};

export const isNoteCollaborator: IsNoteCollaborator = (user, note) => {
  return Boolean(note?.collaborators?.find?.((collaborator) => collaborator?.userId === user?.userId));
};

export const isAuthorizedToViewNote: IsAuthorizedToViewNote = (note, user) => {
  return isNoteAuthor(user!, note) || isNoteCollaborator(user!, note) || !isPrivateNote(note);
};
