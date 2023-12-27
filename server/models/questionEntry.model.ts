import {Schema, model} from "mongoose";

const QuestionEntrySchema = new Schema({
  points: {
    type: Number,
    default: 0
  },
  values: {
    type: [String],
    default: []
  },
  createAt: {
    type: Number,
    default: Date.now()
  },
  _student: { type: 'ObjectId', ref: 'users' },
  _question: { type: 'ObjectId', ref:'questions'},
});

export const QuestionEntryModel = model('question_entries', QuestionEntrySchema)