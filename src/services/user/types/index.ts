import { User } from "src/types";
import { FilterQuery } from "mongoose";

export interface UserExistsQuery extends FilterQuery<User> { }

export interface GetUserProps {
  id?: string;
  email?: string;
  userId?: string;
  username?: string;
}

export interface NewUserProps {
  username?: string;
  password: string;
  email?: string;
}