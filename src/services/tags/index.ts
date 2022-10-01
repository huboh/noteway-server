import { NewTag } from "./utils";
import { database } from "../../";
import { paginateQuery } from "../../utils/helpers";
import { GetTagProps, GetTagsProps, TagExistsProps, CreateTagProps, DeleteTagProps, DeleteTagsProps } from "./types";

export const tagsApi = {
  async getTag(props: GetTagProps) {
    return database.models.Tag.findOne({ tagId: props.tagId });
  },

  async getTags(props: GetTagsProps) {
    return paginateQuery({ model: database.models.Tag, query: { userId: props.userId } });
  },

  async createTag(props: CreateTagProps) {
    return database.models.Tag.create([NewTag(props.tagData)], { session: props.session });
  },

  async tagExists(props: TagExistsProps) {
    const searchQuery = { userId: props.userId, $or: [{ tagId: props.tagId }, { label: props.label }] };

    return Boolean(
      database.models.Tag.exists(searchQuery)
    );
  },

  async deleteTag(props: DeleteTagProps) {
    const session = props.session;
    const deleteFilter = { tagId: props.tagId };
    const deleteTagResult = await database.models.Tag.findOneAndDelete(deleteFilter, { session });

    return {
      isDeleted: Boolean(deleteTagResult?.$isDeleted?.())
    };
  },

  async deleteTags(props: DeleteTagsProps) {
    const session = props.session;
    const deleteTagsFilter = { tagId: { $in: props.tagIds.map((id) => String(id)) } };
    const deleteTagsResults = await database.models.Tag.deleteMany(deleteTagsFilter, { session });

    return {
      count: deleteTagsResults.deletedCount
    };
  },
};

export {
  tagsApi as default
};