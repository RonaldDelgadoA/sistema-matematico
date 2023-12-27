import { updateQuestion } from "../../services/question.service"

export default defineEventHandler(async(event) => {
  const body = await readBody(event)
  return await updateQuestion(body)
})
