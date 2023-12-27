import { QuestionModel } from "../models/question.model"
import { QuestionEntryModel } from "../models/questionEntry.model"

export const answerQuestion = async(dto:AnswerQuestionDto)=>{
  const question = await QuestionModel.findById(dto._question)
  const entry = await QuestionEntryModel.create({
    _question: dto._question,
    _student: dto._student
  })
  entry.values.push(dto.value)
  await entry.save()

  if(question!.answer1 === dto.value || (question!.answer2 === dto.value && !!question?.answer2)){
    entry.points = 5
    await entry.save()
    return {
      correct: true
    }
  }

  
  return{
    feedback: question!.feedback1,
    correct: false,
    _entry: entry._id,
  }
}

export const answerQuestionWithFeedback = async(dto:CreateQuestioEntryDto)=>{
  const entry = (await QuestionEntryModel.findById(dto._id))!
  const question = (await QuestionModel.findById(entry._question))!
  entry.values.push(dto.value)
  await entry.save()

  if(entry.values.length > 5) throw createError({status: 400, statusMessage: 'No tiene más intentos!'})

  if((entry.values.length === 5 && question.feedback4?.responseIndex === (+dto.value)) || 
      question!.answer1 === dto.value || (question!.answer2 === dto.value && !!question?.answer2)){
    entry.points = 6 - entry.values.length
    await entry.save()
    return {
      correct: true
    }
  }

  return{
    feedback: entry.values.length === 4 ? question[`feedback4`]?.options : question[`feedback${entry.values.length as 2|3|5}`],
    correct: false
  }

}

interface AnswerQuestionDto{
  _student: string
  _question: string
  value: string
}

interface CreateQuestioEntryDto{
  _id: string,
  value: string,
}