import User from './User';
import { NoteAttachment } from '../../types';

import { Schema, model } from 'mongoose';

const NoteAttachmentSchema = new Schema({
  fileType: {
    type: String, required: true
  },
  AttachedBy: {
    type: Schema.Types.ObjectId, ref: User
  }
},
  {
    timestamps: true,
  }
);

const NoteAttachment = model<NoteAttachment>('NoteAttachment', NoteAttachmentSchema);

export {
  NoteAttachment as default
};