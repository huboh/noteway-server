import { Note } from '../../types';
import { Schema, model } from 'mongoose';
import { DEFAULT_NOTE_VISIBILITY } from '../../utils/constants';

const NoteSchema = new Schema({
  authorId: {
    type: Schema.Types.ObjectId, required: true,
  },
  content: {
    type: String, required: true
  },
  isPrivate: {
    type: Boolean, default: false
  },
  isArchived: {
    type: Boolean, default: false
  },
  visibility: {
    type: String,
    lowercase: true,
    default: DEFAULT_NOTE_VISIBILITY
  },
  tag: {
    color: { type: String, default: null, maxlength: 12 },
    label: { type: String, default: null, maxlength: 120 }
  },
  title: {
    type: String,
    lowercase: true,
    required: [true, 'note title is required']
  },
},
  {
    timestamps: true,
  }
);

const Note = model<Note>('Note', NoteSchema);

export {
  Note as default
};