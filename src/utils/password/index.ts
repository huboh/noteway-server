import bcrypt from 'bcrypt';

export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 15;
export const FakeHashedPassword = `$2b$${SALT_ROUNDS}$invalid_password.dddddddddddddddddddddddddddddddddddd`;

export const encrypt = (password: string) => {
  return bcrypt.hash(password, Number(SALT_ROUNDS) || 15);
};

export const compare = (plainTextPassword: string, hashedPassword: string) => {
  return bcrypt.compare(plainTextPassword, hashedPassword);
};

export default {
  compare,
  encrypt,
  SALT_ROUNDS,
  FakeHashedPassword
};