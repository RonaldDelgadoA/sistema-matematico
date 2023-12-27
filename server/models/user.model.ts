import {Schema, model} from "mongoose";
import { LEVEL } from "../constants";

const UserSchema = new Schema({
  name: String,
  email: String,
  role: {
    type: String,
    enum: ['teacher','student',]
  },
  level:{
    type: String,
    enum: Object.values(LEVEL),
  },
})

export const UserModel = model('users', UserSchema)