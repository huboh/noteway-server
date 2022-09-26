import { database } from "../../";
import { GetUserProps } from "./types";

export const userApi = {
  async getUser(props: GetUserProps, includePassword?: boolean) {
    const { id, userId, email, username } = props;

    return (
      database.models.User
        .findOne({ $or: [{ _id: id }, { userId }, { email }, { username }] })
        .select(includePassword ? '+password' : undefined)
    );
  }
};

export {
  userApi as default
};