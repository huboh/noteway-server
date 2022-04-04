import * as style from '@dicebear/micah';
import { createAvatar } from '@dicebear/avatars';

export const create = (seed: string, options: Parameters<typeof createAvatar>[1] = {}) => (
  createAvatar(style, {
    seed: seed,
    size: 400,
    dataUri: true,
    ...options
  })
);

export default {
  create
};