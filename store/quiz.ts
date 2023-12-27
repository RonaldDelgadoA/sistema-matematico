import {defineStore} from "pinia";

interface IState{
  currentQuestion: IQuestionQuiz | null,
  currentIdQuestionEntry?: string | null,
  feedback?: string | string[] | null,
  correct: boolean,
  attemps: number,
}

interface IResponseAnswer{
  feedback?: string | string[],
  correct: boolean,
  _entry: string,
}

interface IResponseAnswerWithFeedback{
  feedback?: string | string[],
  correct: boolean,
}

export const useQuizStore = defineStore('quiz',{
  state: ():IState =>({
    currentQuestion: null,
    currentIdQuestionEntry: null,
    feedback: null,
    correct: false,
    attemps: 0
  }),
  actions:{
    async getQuestion(idStudent: string){
      this.clearData()
      const { data, error} = await useFetch(`/api/question/to-student/${idStudent}`)
      if(data.value){
        this.currentQuestion = data.value as IQuestionQuiz
      }
    },    
    async sendAnswer(body:{_student: string, value: string}){
      const {data, error} = await useFetch('/api/question-entries/answer',{
        method:'POST',
        body: {...body, _question: this.currentQuestion!._id}
      })
      
      if(data.value){
        const {correct, feedback, _entry} = data.value as IResponseAnswer
        this.correct = correct
        this.feedback = feedback
        this.currentIdQuestionEntry = _entry
      }
      this.attemps++;
    },
    async sendAnswerWithFeedback(value: string){
      const {data, error} = await useFetch('/api/question-entries/answer-with-feedback',{
        method:'POST',
        body: {value: value, _id: this.currentIdQuestionEntry}
      })
      
      if(data.value){
        const {correct, feedback} = data.value as IResponseAnswerWithFeedback
        this.correct = correct
        this.feedback = feedback
      }
      this.attemps++;
    },
    clearData(){
      this.correct = false
      this.attemps = 0
      this.feedback = null
    }
  }
})