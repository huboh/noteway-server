import User from '../User';

import * as Types from '../../../types';

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

const NoteAttachment = model<Types.NoteAttachment>('NoteAttachment', NoteAttachmentSchema);

export {
  NoteAttachment as default
};