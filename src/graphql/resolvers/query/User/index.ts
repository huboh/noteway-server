import { User } from '../../../../types';
import { noteApi } from "../../../../services";
import { QueryResolvers } from "../../../types";

const User: QueryResolvers<User> = {
  notes(user, variables, context) {
    const filter = variables?.filter || {};
    const searchQuery = { limit: filter.limit, page: filter.page };

    return noteApi.getNotes({
      user: context.user, authorId: user.userId, query: searchQuery
    });
  },

  archivedNotes(user, variables, context) {
    const filter = variables?.filter || {};
    const searchQuery = { limit: filter.limit, page: filter.page, isArchived: true };

    return noteApi.getNotes({
      user: context.user, authorId: user.userId, query: searchQuery
    });
  }
};

export {
  User as default
};