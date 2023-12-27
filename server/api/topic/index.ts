import { TOPIC } from "../../constants"

export default defineEventHandler((event) => {
  return Object.values(TOPIC)
})