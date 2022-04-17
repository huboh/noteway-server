import User from './User';

import * as Types from '../../types';
import * as Constants from '../../utils/constants';

import { Schema, model } from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';


const CollaboratorSchema = new Schema({
  noteId: {
    type: String, required: true
  },
  userId: {
    type: String, required: true
  },
  collaboratorId: {
    type: String, required: true, unique: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    autopopulate: true,
    required: true,
    ref: User,
  },
  role: {
    type: String, default: Constants.DEFAULT_COLLABORATOR_ROLE
  },
},
  {
    timestamps: true,
  }
);

CollaboratorSchema.plugin(mongooseAutoPopulate);

const Collaborator = model<Types.Collaborator>('Collaborator', CollaboratorSchema);

export {
  Collaborator as default
};