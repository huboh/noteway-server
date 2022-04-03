import { Schema, model } from 'mongoose';

const CollaboratorSchema = new Schema({
  noteId: {
    type: Schema.Types.ObjectId, required: true, unique: true
  },
  addedBy: {
    type: Schema.Types.ObjectId, required: true, unique: true
  },
  userId: {
    type: Schema.Types.ObjectId, required: true
  },
  permission: {
    canAddCollaborators: { type: Boolean, default: false }
  },
},
  {
    timestamps: true,
  }
);

const Collaborator = model('Collaborator', CollaboratorSchema);

export {
  Collaborator as default
};