import { getAllQuestions } from "../../services/question.service"

export default defineEventHandler(async(event) => {
  
  const {idTeacher} = event.context.params!
  return await getAllQuestions(idTeacher)
})
