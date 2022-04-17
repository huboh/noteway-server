import validator from 'validator';
import { Schema, model } from 'mongoose';

import * as Types from '../../../types';
import * as Constants from '../../../utils/constants';


const UserSchema = new Schema({
  userId: {
    type: String, required: true
  },
  avatarUrl: {
    type: String, default: null, trim: true
  },
  name: {
    type: String, lowercase: true, default: null,
  },
  isEmailVerified: {
    type: Boolean, default: false
  },
  isDeactivated: {
    type: Boolean, default: false
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: [true, 'username is required'],
  },
  password: {
    type: String,
    select: false,
    required: [true, 'password is required'],
    minlength: [6, 'minimum password lenght is 6'],
    validate: [(password: string) => validator.isStrongPassword(password, { minLength: 6, minSymbols: 0 }), 'password must contains at least 1 LowerCase letter, Uppercase letter']
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: [true, 'email address is required'],
    validate: [validator.isEmail, 'invalid email address']
  },
  preferences: {
    theme: { type: String, default: Constants.DEFAULT_THEME_PREFERENCE },
    sortNoteBy: { type: String, default: Constants.DEFAULT_NOTE_SORTING },
  },
},
  {
    timestamps: true,
  }
);

const User = model<Types.User>('User', UserSchema);

export {
  User as default
};