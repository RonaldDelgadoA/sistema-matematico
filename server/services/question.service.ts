
import { QuestionModel } from "../models/question.model"
import {Types} from "mongoose";

export const createQuestion = async(question:CreateQuestionDto)=>{
  return await QuestionModel.create({
    ...question,
    createAt: Date.now()
  })
}

export const updateQuestion = async(question:UpdateQuestionDto)=>{
  const {_id,name,answer1,answer2,feedback1,feedback2,feedback3,feedback4,feedback5, colorFeedback} = question
  if(!_id || !name || !answer1 || !feedback1 || !feedback2 || !feedback3 || !feedback4 || !feedback5 || !colorFeedback){
    throw createError({
      status: 400,
      statusMessage: 'Debe enviar estos campos: {_id,name,answer1,feedback1,feedback2,feedback3,feedback4,feedback5,colorFeedback}'
    })
  }
  
  return await QuestionModel.findByIdAndUpdate(_id,{
    name,
    answer1,
    answer2: answer2 ?? null,
    feedback1,
    feedback2,
    feedback3,
    feedback4,
    feedback5,
    colorFeedback,
  })
}

export const getAllQuestions = async(idTeacher:string)=>{
  return await QuestionModel.find({_teacher:idTeacher})
}

export const getQuestionById = async(id:string)=>{
  return await QuestionModel.findById(id)
}

export const deleteQuestion = async(id:string)=>{
  return await QuestionModel.findByIdAndDelete(id)
}

export const questionToStudent = async(idStudent: string) =>{
  const data = await QuestionModel.aggregate([
    {
      $lookup: {
        from: 'question_entries',
        localField: '_id',
        foreignField: '_question',
        as: 'entries'
      },
    },
    {
      $match: {
        'entries._student': { $ne: new Types.ObjectId(idStudent) },
      }
    },
    {
      $project:{
        _id: 1,
        name: 1,
        topic: 1,
        level: 1,
        colorFeedback: 1
      }
    },
    {
      $sample: {
        size: 1,      
      },
    },
  ])
  if(data.length === 0) throw createError({status:400, statusMessage: 'No hay preguntas disponibles!'})
  
  return data[0]
}

interface CreateQuestionDto{
  name: string,
  answer1: string,
  answer2: string,
  feedback1: string,
  feedback2: string,
  feedback3: string,
  feedback4: string,
  feedback5: {
    options:string[],
    responseIndex: number,
  },
  colorFeedback: string,
  _teacher: string
}

interface UpdateQuestionDto{
  _id: string,
  name: string,
  answer1: string,
  answer2: string,
  feedback1: string,
  feedback2: string,
  feedback3: string,
  feedback4: string,
  feedback5: {
    options:string[],
    responseIndex: number,
  },
  colorFeedback: string,
}