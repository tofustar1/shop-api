import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {UserFields} from "../types";

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema<UserFields>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', async function(next){
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
  next();
});

UserSchema.set('toJSON', {
  transform: (_doc, ret: Partial<UserFields>) => {
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model('User', UserSchema);
export default User;