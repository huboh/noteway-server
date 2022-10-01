import { database } from "../../";
import { NewNoteActivity } from "./utils";
import { paginateQuery } from "../../utils/helpers";
import { GetNoteActivitiesProps, CreateNoteActivityProps, DeleteNoteActivitiesProps } from "./types";

export const noteActivitiesApi = {
  async getNoteActivitiies(props: GetNoteActivitiesProps) {
    return paginateQuery({
      model: database.models.NoteActivity, query: { noteId: props.noteId }
    });
  },

  async createNoteActivity(props: CreateNoteActivityProps) {
    const session = props.session;
    const activity = NewNoteActivity(props);

    return database.models.NoteActivity.create([activity], {
      session
    });
  },

  async deleteNoteActivities(props: DeleteNoteActivitiesProps) {
    const session = props.session;
    const activitiesId = props.activitiesId.map((id) => String(id));
    const deleteManyFilter = { noteId: props.noteId, activityId: { $in: activitiesId } };
    const deleteActivitiesResults = await database.models.NoteActivity.deleteMany(deleteManyFilter, {
      session
    });

    return {
      count: deleteActivitiesResults.deletedCount
    };
  },
};

export {
  noteActivitiesApi as default
};