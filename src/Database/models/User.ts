import validator from 'validator';
import { Schema, model } from 'mongoose';

import password from '../../utils/password';
import { DEFAULT_THEME_PREFERENCE } from '../../utils/constants';

const UserSchema = new Schema({
  avatarUrl: {
    type: String, lowercase: true, default: null,
  },
  name: {
    type: String, lowercase: true, default: null,
  },
  isEmailVerified: {
    type: Boolean, default: false
  },
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'username is required'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: [6, 'minimum password lenght is 6'],
    validate: [(password: string) => validator.isStrongPassword(password, { minLength: 6 }), 'password must contains at least 1 LowerCase letter, Uppercase letter & a Symbol']
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'email address is required'],
    validate: [validator.isEmail, 'invalid email address']
  },
  preferences: {
    theme: { type: String, default: DEFAULT_THEME_PREFERENCE }
  }
},
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function () {
  this.password = await password.hashPassword(this.password);
});

const User = model('User', UserSchema);

export {
  User as default
};