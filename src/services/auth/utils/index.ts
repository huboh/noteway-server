import validator from "validator";

import { AuthCredentials } from "../types";
import { compare, FakeHashedPassword } from "../../../utils/password";
import { ValidationError, AuthenticationError } from "../../../utils/errors";

export const invalidEmailErrorMessage = 'invalid email';
export const invalidPasswordErrorMessage = 'invalid password';

export const isStringPasswordConfig = {
  minUppercase: 1,
  minLowercase: 1,
  minNumbers: 1,
  minSymbols: 0,
  minLength: 6,
};

export const comparePasswordsOrThrow = async (plainTextPassword: string, hashedPassword?: string | null) => {
  if (!(await compare(plainTextPassword, hashedPassword || FakeHashedPassword))) {
    throw new AuthenticationError("invalid email or password");
  };
};

export const validateLoginCredentials = (credentials: AuthCredentials) => {
  const email = credentials.email?.toLowerCase?.().trim?.();
  const username = credentials.username?.toLowerCase?.().trim?.();
  const password = credentials.password;

  if (!email && !username) {
    throw new ValidationError('email address or username is required');
  };

  const errors = [
    (email && validator.isEmail(email)) ? null : invalidEmailErrorMessage,
    (validator.isStrongPassword(password, { minLength: 6, minSymbols: 0 })) ? null : invalidPasswordErrorMessage,
  ];

  // * getting the first error message
  const err = errors.find(Boolean);

  if (err) {
    throw new ValidationError(err);
  };

  return credentials;
};

export const validateSignupCredentials = (credentials: AuthCredentials) => {
  const isEmail = validator.isEmail(credentials.email?.toLowerCase?.().trim?.() || "");
  const isPassword = validator.isStrongPassword(credentials.password, isStringPasswordConfig);

  if (!isPassword || !isEmail) {
    throw new ValidationError("invalid email or password");
  }

  return credentials;
};