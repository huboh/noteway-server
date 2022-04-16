import { nanoid, customAlphabet } from "nanoid";

const generateId = nanoid;
const generateNumbers = (size?: number) => customAlphabet('0123456789', size ?? 6)();

export default {
  generateId,
  generateNumbers
};