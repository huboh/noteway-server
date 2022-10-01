import { database } from "../../";
import { paginateQuery } from "../../utils/helpers";

import { NewCollaborator } from "./utils";
import { GetCollaboratorProps, CreateCollaboratorProps, CreateCollaboratorsProps, DeleteCollaboratorProps, DeleteCollaboratorsProps } from "./types";

export const collaboratorApi = {
  async getCollaborators(props: GetCollaboratorProps) {
    const noteId = props.noteId;

    return paginateQuery({
      model: database.models.Collaborator,
      query: { noteId }
    });
  },

  async createCollaborator(props: CreateCollaboratorProps) {
    const session = props.session;
    const collaborator = NewCollaborator({
      collaboratorData: props.collaboratorData, creator: props.creator, user: props.user,
    });

    return database.models.Collaborator.create([collaborator], {
      session
    });
  },

  async createCollaborators(props: CreateCollaboratorsProps) {
    const session = props.session;
    const collaborators = props.collaboratorsData.map((collaboratorData) => {
      return NewCollaborator({
        collaboratorData: collaboratorData, creator: props.creator, user: props.user,
      });
    });

    return database.models.Collaborator.insertMany(collaborators, {
      session
    });
  },

  async deleteCollaborator(props: DeleteCollaboratorProps) {
    const session = props.session;
    const findFilter = { collaboratorId: props.collaboratorId };
    const collaborator = await database.models.Collaborator.findOneAndDelete(findFilter, {
      session
    });

    return {
      isDeleted: collaborator?.$isDeleted?.() ?? false
    };
  },

  async deleteCollaborators(props: DeleteCollaboratorsProps) {
    const session = props.session;
    const collaboratorsId = props.collaboratorsId.map((id) => String(id));
    const deleteManyFilter = { noteId: props.noteId, collaboratorId: { $in: collaboratorsId } };
    const deleteCollaboratorsResults = await database.models.Collaborator.deleteMany(deleteManyFilter, {
      session
    });

    return {
      count: deleteCollaboratorsResults.deletedCount
    };
  },
};

export {
  collaboratorApi as default
};