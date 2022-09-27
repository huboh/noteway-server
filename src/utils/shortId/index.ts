import { nanoid, customAlphabet } from "nanoid";

export const generateId = nanoid;
export const generateNumbers = (size?: number) => customAlphabet('0123456789', size ?? 6)();

export default {
  generateId,
  generateNumbers
};