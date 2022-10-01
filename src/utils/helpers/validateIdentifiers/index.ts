import { validateId } from "../../mongo";
import { validateUuid } from "../../uuid";
import { ValidateIdentifiers, Key } from "./types";

export const validateIdentifiers: ValidateIdentifiers = (ids) => {
  const keys = Object.keys(ids);

  keys.forEach((key) => {
    switch (key as Key) {
      case 'uuid': ids.uuid && validateUuid(...ids.uuid); break;
      case 'mongoId': ids.mongoId && validateId(...ids.mongoId); break;
      default: break;
    }
  });
};