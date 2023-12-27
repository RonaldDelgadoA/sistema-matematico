import { answerQuestion } from "../../services/questionEntries.service"

export default defineEventHandler(async(event) => {
  const body = await readBody(event)
  return await answerQuestion(body)
})
