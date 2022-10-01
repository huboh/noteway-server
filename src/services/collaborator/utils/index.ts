import { generateId } from "../../../utils/shortId";
import { DEFAULT_COLLABORATOR_ROLE } from "../../../constants";

import { NewCollaboratorProps } from "../types";

export const normalizeCollaboratorRole = (role?: string) => {
  return ['editor', 'viewer', 'commenter'].find((r) => r === role) ? role : DEFAULT_COLLABORATOR_ROLE;
};

export const NewCollaborator = (props: NewCollaboratorProps) => {
  const user = props.user;
  const creator = props.creator;
  const collaboratorData = props.collaboratorData;

  return {
    role: normalizeCollaboratorRole(collaboratorData.role),
    noteId: collaboratorData.noteId,
    collaboratorId: generateId(),
    createdBy: creator._id,
    userId: user.userId,
    user: user._id,
  };
};