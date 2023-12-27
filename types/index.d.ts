export {}

declare global{
  interface IQuestion{
    _id: string,
    name: string,
    answers: string[],
    feedback1: string,
    feedback2: string,
    feedback3: string,
    feedback4: {
      options:string[],
      responseIndex: number,
    },
    feedback5: string,
    topic: string,
    level: string,
    createAt: number,
    _teacher: string,
  }

  interface IQuestionQuiz{
    _id: string,
    name: string,
    topic: string,
    level: string,
    colorFeedback: string
  }
}