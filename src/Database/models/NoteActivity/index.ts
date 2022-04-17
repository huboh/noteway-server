import User from '../User';

import * as Types from '../../../types';

import { Schema, model } from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';


const NoteActivitySchema = new Schema({
  activityId: {
    type: String,
    required: true,
    unique: true,
  },
  action: {
    type: String,
    required: true,
  },
  noteId: {
    type: String,
    required: true,
  },
  initiator: {
    type: Schema.Types.ObjectId,
    autopopulate: true,
    required: true,
    ref: User,
  }
},
  {
    timestamps: true,
  }
);

NoteActivitySchema.plugin(mongooseAutoPopulate);

const NoteActivity = model<Types.NoteActivity>('NoteActivity', NoteActivitySchema);

export {
  NoteActivity as default
};