import { NewTagFunc } from "../types";
import { generateId } from "../../../utils/shortId";

export const NewTag: NewTagFunc = (data) => {
  return {
    userId: data.userId,
    label: data.label,
    color: data.color,
    tagId: generateId(),
  };
};