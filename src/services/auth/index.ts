import { userApi } from "../user";
import { generateToken } from "../../utils/tokens";
import { ForbiddenError } from "../../utils/errors";
import { LoginUserProps, SignupUserProps } from "./types";
import { comparePasswordsOrThrow, validateLoginCredentials, validateSignupCredentials } from "./utils";

export const authApi = {
  async loginUser(props: LoginUserProps) {
    const credentials = validateLoginCredentials(props.loginCredentials);

    const user = await userApi.getUser({ email: credentials.email }, true);
    const match = await comparePasswordsOrThrow(credentials.password, user?.password);
    const authToken = generateToken({ userId: user?.userId || "" });

    user!.password = undefined;

    return {
      authToken,
      user
    };
  },

  async signupUser(props: SignupUserProps) {
    const credentials = validateSignupCredentials(props.signupCredentials);

    if (await userApi.userExists({ email: credentials.email })) {
      throw new ForbiddenError("email already registered, please login");
    }

    const user = await userApi.createUser(credentials);
    const authToken = generateToken({ userId: user.userId });

    user.password = undefined as any;

    return {
      authToken,
      user
    };
  },
};

export {
  authApi as default
};