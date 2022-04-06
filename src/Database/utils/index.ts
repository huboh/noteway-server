import errors from "../../utils/errors";
import password from "../../utils/password";
import { DEFAULT_NOTE_VISIBILITY } from "../../utils/constants";
import { LoginCredentials, User, NoteVisibility } from '../../types';

export const getNoteVisibility = (visibility?: NoteVisibility): NoteVisibility => {
  // @ts-ignore
  return (visibility !== 'private' || visibility !== 'public') || DEFAULT_NOTE_VISIBILITY;
};

export const compareLoginCredentials = async (loginCredentials: LoginCredentials, user: User | null) => {
  if (user) {
    const passwordsMatch = await password.compare(loginCredentials.password, user.password);

    if (passwordsMatch) {
      return user;
    } else {
      throw new errors.AuthenticationError(
        'invalid email or password'
      );
    }

  } else {
    // * user does not exists, causing a delay to hide the fact that email exists in database
    await password.compare(
      loginCredentials.password, `$2b$${password.SALT_ROUNDS}$invalid_password.dddddddddddddddddddddddddddddddddddd`
    );

    throw new errors.AuthenticationError(
      'invalid email or password'
    );
  }
};