import { QueryResolvers } from "../../types";
import { validateIdentifiers } from '../../../utils';
import { noteApi, userApi, collaboratorApi, noteActivitiesApi } from "../../../services";

const query: QueryResolvers = {
  me(_source, _variables, context) {
    return context.user;
  },

  user(_source, variables, _context) {
    return userApi.getUser(variables.filter);
  },

  note(_source, variables, context) {
    return noteApi.getNote({
      user: context.user, noteId: variables.noteId
    });
  },

  notes(_source, variables, context) {
    validateIdentifiers({ uuid: [variables.authorId] });

    return noteApi.getNotes({
      authorId: variables.authorId,
      user: context.user,
    });
  },

  collaborators(_source, variables, _context) {
    return collaboratorApi.getCollaborators({
      noteId: variables.noteId
    });
  },

  noteActivities(_source, variables, _context) {
    return noteActivitiesApi.getNoteActivitiies({
      noteId: variables.noteId
    });
  },

  archivedNotes(_source, variables, context) {
    validateIdentifiers({ uuid: [variables.authorId] });

    return noteApi.getNotes({
      authorId: variables.authorId, user: context.user, query: {
        isArchived: true
      }
    });
  },
};

export {
  query as default
};