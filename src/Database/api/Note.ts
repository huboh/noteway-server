import User from "./User";
import Note from "../models/Note";
import errors from "../../utils/errors";
import { getNoteVisibility } from "../utils";
import { validateMongoObjectId, paginateQuery } from "../../utils";
import { CreateNoteQueryFilter, GetNoteQueryFilter, GetNotesQueryFilter, DeleteNoteQueryFilter, UpdateNoteQueryFilter } from "../../types";

export default {
  async getNote({ userId, id }: GetNoteQueryFilter) {
    validateMongoObjectId(userId, id);

    const note = await Note.findOne({ _id: id });
    const isPrivateNote = note?.visibility === 'private';
    const isRequestedByAuthor = userId === note?.authorId;

    // TODO : allow access to collaborators of a private note
    // const isRequestedByACollaborator = Boolean(note.collaborators.find(() => userId === collaboratorId))

    if (!isRequestedByAuthor && isPrivateNote) {
      throw new errors.NotAuthorized('Not authorized to view this Note');
    };

    return (
      note
    );
  },

  async getNotes(queryFilter: GetNotesQueryFilter<typeof Note>) {
    const { userId, authorId, limit, page } = queryFilter;
    const isRequestedByAuthor = userId === authorId;
    // if note is requested by the author, we dont care if its private
    const isPrivateNote = isRequestedByAuthor ? undefined : false;

    validateMongoObjectId(userId, authorId);

    return paginateQuery({
      page,
      limit,
      model: Note,
      query: JSON.parse(JSON.stringify({
        isPrivate: isPrivateNote,
        authorId,
      }))
    });
  },

  async createNote(queryFilter: CreateNoteQueryFilter) {
    const { userId, note } = queryFilter;
    const { content, isArchived, tag, title, visibility } = note;
    const noteVisibility = getNoteVisibility(visibility);
    const user = await User.getUser({ id: userId });

    if (!user) {
      throw new errors.ForbiddenError('please login to create a new note');
    }

    return {
      note: await Note.create({
        visibility: noteVisibility,
        isPrivate: noteVisibility === 'private',
        isArchived,
        authorId: userId,
        content,
        title,
        tag,
      })
    };
  },

  async deleteNote(queryFilter: DeleteNoteQueryFilter) {
    const { userId, noteId } = queryFilter;
    const [user, note] = await Promise.all([
      User.getUser({ id: userId }), this.getNote({ id: noteId, userId })
    ]);

    if (!note) {
      throw new errors.ForbiddenError('Note does not exists');
    } else if (!user) {
      throw new errors.ForbiddenError('Please login to delete this note');
    } else if (note.authorId !== user.id) {
      throw new errors.ForbiddenError('Not Authorized');
    }

    return {
      deleted: (await Note.deleteOne({ _id: noteId })).deletedCount === 1
    };
  },

  async updateNote(queryFilter: UpdateNoteQueryFilter) {
    const { userId, noteId, note } = queryFilter;
    const { content, isArchived, tag, title, visibility } = note;
    const noteVisibility = getNoteVisibility(visibility);
    const author = await User.getUser({ id: userId });
    const isRequestedByAuthor = note?.authorId === author?.id;

    if (!isRequestedByAuthor) {
      throw new errors.ForbiddenError('Not Authorized');
    } else if (!author) {
      throw new errors.ForbiddenError('Please login to update this note');
    }

    validateMongoObjectId(noteId);

    return {
      note: await Note.findByIdAndUpdate(noteId, {
        $set: {
          tag,
          title,
          content,
          isArchived,
          visibility: noteVisibility,
          isPrivate: noteVisibility === 'private',
        }
      }, {
        new: true
      })
    };
  },
};