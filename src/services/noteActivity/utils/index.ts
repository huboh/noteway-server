import { generateId } from "../../../utils/shortId";
import { NewNoteActivityProps, NoteActivityAction } from "../types";

export const KnownActivityAction = [
  'created note', 'updated note', 'added attachment(s)', 'removed attachment(s)',
  'added collaborator(s)', 'removed collaborator(s)', 'transferred ownership',
];

export const normalizeActivityAction = (activity?: string) => {
  return (KnownActivityAction.find((a) => a === activity) ? activity : "unknown") as NoteActivityAction;
};

export const NewNoteActivity = (props: NewNoteActivityProps) => {
  const initiator = props.initiator;
  const activityData = props.activityData;

  return {
    activityId: generateId(),
    initiator: initiator._id,
    noteId: activityData.noteId,
    action: normalizeActivityAction(activityData.action),
  };
};