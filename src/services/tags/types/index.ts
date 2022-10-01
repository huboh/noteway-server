import { Tag } from "../../../types";
import { ClientSession } from "mongoose";

export type NewTagData = Partial<Omit<Tag, "id" | "_id" | "createdAt" | "updatedAt">>;

export interface GetTagProps {
  tagId: string;
}

export interface GetTagsProps {
  userId: string;
}

export interface TagExistsProps {
  userId: string;
  tagId: string;
  label: string;
}

export interface CreateTagProps {
  session?: ClientSession;
  tagData: NewTagData;
}

export interface DeleteTagProps {
  session?: ClientSession;
  tagId: string;
}

export interface DeleteTagsProps {
  session?: ClientSession;
  tagIds: string[];
}

//

export type NewTagFunc = (data: NewTagData) => NewTagData;