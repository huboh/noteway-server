import { Resolvers, Context, User } from '../../../../types';

const user: Resolvers<User, Record<string, any>, Context, any> = {

  notes: (user, variables, context) => {
    const { userId: authorId } = user;
    const { database, userId } = context;
    const { limit, page } = variables?.filter || {};

    return database.Note.getNotes({
      userId, authorId, limit, page
    });
  },

  archivedNotes: (user, variables, context) => {
    const { userId: authorId } = user;
    const { database, userId } = context;
    const { limit, page } = variables?.filter || {};
    const query = { isArchived: true };

    return database.Note.getNotes({
      userId, authorId, limit, query, page,
    });
  }
};

export {
  user as default
};