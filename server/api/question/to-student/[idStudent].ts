import { questionToStudent } from "../../../services/question.service"
import { getStudentById } from "../../../services/user.service"


export default defineEventHandler(async(event) => {
  const {idStudent} = event.context.params!
  await getStudentById(idStudent)
  const question = await questionToStudent(idStudent)
  return question
})
