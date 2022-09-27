import { createUuid } from "../../../utils/uuid";
import { generateNumbers } from "../../../utils/shortId";
import { create as createAvatar } from "../../../utils/avatar";
import { encrypt as encryptPassword } from "../../../utils/password";

import type { NewUserProps } from "../types";

export const generateUsername = (username: string) => {
  return `${username}${generateNumbers()}`;
};

export const extractNameFromEmail = (email?: string) => {
  return String(email).replace(/@.*/, '');
};

export const NewUser = async (props: NewUserProps) => {
  const email = props.email;
  const password = await encryptPassword(props.password);
  const username = props.username || extractNameFromEmail(email);

  return {
    username: generateUsername(username),
    avatarUrl: createAvatar(username),
    userId: createUuid(),
    password: password,
    email: email,
  };
};