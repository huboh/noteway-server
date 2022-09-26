import { database } from "../../";
import { paginateQuery } from "../../utils/helpers";
import { AuthorizationError } from "../../utils/errors";
import { removeUndefinedValues } from "../../utils";

import { GetNoteProps, GetNotesProps } from "./types";
import { isAuthorizedToViewNote, isNoteAuthor } from "./utils/predicates";

export const noteApi = {
  async getNote(props: GetNoteProps) {
    const user = props.user;
    const note = await database.models.Note.findOne({ noteId: props.noteId });

    if (!isAuthorizedToViewNote(note!, user!)) {
      throw new AuthorizationError("you dont have permissions to view this note");
    }

    return note;
  },

  async getNotes(props: GetNotesProps) {
    const isAuthor = props.authorId === props.user?.userId;
    const notesQuery = Object.assign((props.query || {}), removeUndefinedValues({
      isPrivate: isAuthor ? undefined : false,
      authorId: props.authorId,
    }));

    return paginateQuery({
      model: database.models.Note,
      query: notesQuery,
    });
  },
};

export {
  noteApi as default
};