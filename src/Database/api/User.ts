import User from '../models/User';
import tokens from '../../utils/tokens';
import errors from '../../utils/errors';
import { compareLoginCredentials } from '../utils';
import { extractNameFromEmail, validateMongoObjectId } from '../../utils';
import { GetUserQueryFilter, UserExistsQueryFilter, DeleteUserQueryFilter, SignupCredentials, LoginCredentials } from '../../types';

export default {
  async userExists(queryFilter: UserExistsQueryFilter) {
    const { id: _id, email, username } = queryFilter;

    validateMongoObjectId(_id);

    return User.exists({ $or: [{ username }, { _id }, { email }] });
  },

  async userNameExists(username: string) {
    return User.exists({ username });
  },

  async getUser(queryFilter: GetUserQueryFilter) {
    const { id: _id, email, username } = queryFilter;

    validateMongoObjectId(_id);

    return User.findOne({
      $or: [{ _id }, { email }, { username }]
    });
  },

  async deleteUser(queryFilter: DeleteUserQueryFilter) {
    const { id: _id, email, username } = queryFilter;

    validateMongoObjectId(_id);

    const deletedUser = await User.findOneAndDelete({ $or: [{ username }, { _id }, { email }] });
    const deleted = deletedUser?.$isDeleted() ?? false;

    return {
      deleted
    };
  },

  async loginUser(loginCredentials: LoginCredentials) {
    const { email, username } = loginCredentials;
    const dbUser = await this.getUser({ email, username });
    const user = await compareLoginCredentials(loginCredentials, dbUser);
    const authToken = tokens.generateToken({ userId: (user as any)._id });

    (user as any).password = undefined;

    return {
      authToken,
      user
    };
  },

  async signupUser(signupCredentials: SignupCredentials) {
    const { email, username = extractNameFromEmail(email), password } = signupCredentials;
    const userExists = await this.userExists({ email, username });

    if (userExists) {
      throw new errors.ForbiddenError('user already registered, please login');
    }

    const user = await User.create({ email, username, password });
    const authToken = await tokens.generateToken({ userId: (user as any)._id });

    (user as any).password = undefined;

    return {
      authToken,
      user
    };
  },
};