import { QueryResolvers } from "../../types";
import { noteApi, userApi } from "../../../services";
import { validateIdentifiers } from '../../../utils';

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

  notes: (_source, variables, context) => {
    validateIdentifiers({ uuid: [variables.authorId] });

    return noteApi.getNotes({
      authorId: variables.authorId,
      user: context.user,
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