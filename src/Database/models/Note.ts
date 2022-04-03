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
    type: String, default: DEFAULT_NOTE_VISIBILITY
  },
  tags: [{
    color: { type: String, default: null, maxlength: 12 },
    label: { type: String, default: null, maxlength: 120, required: true, unique: true }
  }],
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

const Note = model('Note', NoteSchema);

export {
  Note as default
};