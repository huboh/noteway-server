import errors from '../errors';
import { v4, validate } from 'uuid';
import { INVALID_ID_ERROR_MESSAGE } from '../constants';

export const createUuid = () => v4();

export const validateUuid = (...uuids: unknown[]) => uuids.forEach(uuid => {
  if (uuid && !validate(uuid as string)) {
    throw new errors.ValidationError(INVALID_ID_ERROR_MESSAGE);
  }
});

export default {
  createUuid,
  validateUuid
};