import Tag from './Tag';
import User from './User';
import Collaborator from './Collaborator';
import NoteActivity from './NoteActivity';
import NoteAttachment from './NoteAttachment';

import * as Types from '../../types';
import * as Constants from '../../utils/constants';

import { Schema, model } from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';


const NoteSchema = new Schema({
  noteId: {
    type: String, required: true
  },
  authorId: {
    type: String, required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    autopopulate: true,
    required: true,
    ref: User,
  },
  content: {
    type: String, required: true, default: ''
  },
  isStarred: {
    type: Boolean, default: false
  },
  isPinned: {
    type: Boolean, default: false
  },
  isPrivate: {
    type: Boolean, default: false
  },
  isArchived: {
    type: Boolean, default: false
  },
  isAddedToTrash: {
    type: Boolean, default: false
  },
  visibility: {
    type: String,
    lowercase: true,
    default: Constants.DEFAULT_NOTE_VISIBILITY
  },
  title: {
    type: String,
    trim: true,
    default: ''
  },
  tag: {
    type: Schema.Types.ObjectId,
    ref: Tag,
    default: null,
    autopopulate: true,
  },
  activities: [{
    type: Schema.Types.ObjectId,
    ref: NoteActivity,
    autopopulate: true,
    default: [],
  }],
  starredBy: [{
    type: Schema.Types.ObjectId,
    ref: User,
    autopopulate: true,
    default: [],
  }],
  attachments: [{
    type: Schema.Types.ObjectId,
    ref: NoteAttachment,
    autopopulate: true,
    default: [],
  }],
  collaborators: [{
    type: Schema.Types.ObjectId,
    ref: Collaborator,
    autopopulate: true,
    default: [],
  }],
},
  {
    timestamps: true,
  }
);

NoteSchema.plugin(mongooseAutoPopulate);

const Note = model<Types.Note>('Note', NoteSchema);

export {
  Note as default
};