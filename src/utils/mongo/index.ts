import errors from "../errors";
import { isValidObjectId } from 'mongoose';

export const validateId = (...ids: unknown[]) => ids.forEach(id => {
  if (id && !isValidObjectId(id)) {
    throw new errors.ValidationError('invalid idenitifier');
  }
});

export default {
  validateId
};