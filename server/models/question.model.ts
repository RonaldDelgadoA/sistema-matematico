import {Schema, model} from "mongoose";
import { LEVEL, TOPIC } from "../constants";

const QuestionSchema = new Schema({
  name: String,
  answer1:{
    type: String
  },
  answer2:{
    type: String,
  },
  feedback1: String,
  feedback2: String,
  feedback3: String,
  feedback4:{
    options:[String],
    responseIndex: Number
  },
  feedback5: String,
  colorFeedback: String,
  createAt: Number,
  topic:{
    type: String,
    enum: Object.values(TOPIC)
  },
  level:{
    type: String,
    enum: Object.values(LEVEL)
  },
  _teacher: { type: 'ObjectId', ref: 'users' }
})

export const QuestionModel = model('questions', QuestionSchema)