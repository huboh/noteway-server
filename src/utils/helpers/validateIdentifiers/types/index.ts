export type ID = string | undefined | null;

export type Key = keyof Identifiers;

export type ValidateIdentifiers = (ids: Identifiers) => void | never;

export interface Identifiers {
  uuid?: ID[];
  mongoId?: ID[];
}