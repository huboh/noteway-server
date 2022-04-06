import { SignupCredentials, LoginCredentials, Context } from '../../../types';

const mutation = {
  userDelete(source: undefined, variables: any, context: Context) {
    const { userId } = variables;
    const { database } = context;

    return database.User.deleteUser({
      id: userId
    });
  },

  userSignup(source: undefined, variables: any, context: Context) {
    const { password, email, username } = variables.signupCredentials as SignupCredentials;
    const { database } = context;

    return database.User.signupUser({
      password, email, username
    });
  },

  userLogin(source: undefined, variables: any, context: Context) {
    const { password, email, username } = variables.loginCredentials as LoginCredentials;
    const { database } = context;

    return database.User.loginUser({
      password, email, username
    });
  }
};

export {
  mutation as default
};