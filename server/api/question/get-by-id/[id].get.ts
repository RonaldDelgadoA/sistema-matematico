import { getQuestionById } from "../../../services/question.service"

export default defineEventHandler(async(event) => {
  
  const {id} = event.context.params!
  return await getQuestionById(id)
})
