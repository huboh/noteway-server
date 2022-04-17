import * as Types from '../../types';

import { Schema, model } from 'mongoose';

const TagSchema = new Schema({
  tagId: {
    type: String, required: true, unique: true
  },
  userId: {
    type: String, required: true
  },
  color: {
    type: String, default: null, maxlength: 12
  },
  label: {
    type: String, required: true, maxlength: 120, unique: true
  },
},
  {
    timestamps: true,
  }
);

const Tag = model<Types.Tag>('Tag', TagSchema);

export {
  Tag as default
};