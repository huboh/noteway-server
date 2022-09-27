import { NewUser } from "./utils";
import { database } from "../../index";
import { UserExistsQuery, GetUserProps, NewUserProps } from "./types";

export const userApi = {
  async userExists(query: UserExistsQuery) {
    return database.models.User.exists(query);
  },

  async createUser(props: NewUserProps) {
    return database.models.User.create(await NewUser(props));
  },

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