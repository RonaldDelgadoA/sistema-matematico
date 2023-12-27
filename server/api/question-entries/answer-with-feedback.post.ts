import { answerQuestionWithFeedback } from "../../services/questionEntries.service"

export default defineEventHandler(async(event) => {
  const body = await readBody(event)
  return await answerQuestionWithFeedback(body)
})
