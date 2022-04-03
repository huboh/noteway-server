import { v4, validate } from 'uuid';

export const createUuid = () => v4();
export const validateUuid = (uuid: string) => validate(uuid);

// * i want the module to have a consistent api, that's why im avoiding the style below 🙄
// export { v4 as createUuid } from 'uuid';
// export { validate as validateUuid } from 'uuid';