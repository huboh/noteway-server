import bcrypt from 'bcrypt';

const { SALT_ROUNDS } = process.env;

const encrypt = (password: string) => (
  bcrypt.hash(password, Number(SALT_ROUNDS) || 15)
);

const compare = (plainTextPassword: string, hashedPassword: string) => (
  bcrypt.compare(plainTextPassword, hashedPassword)
);

export default {
  compare,
  encrypt,
  SALT_ROUNDS,
};