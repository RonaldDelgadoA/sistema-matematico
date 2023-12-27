import {defineStore} from "pinia";

interface IState{
  questions: IQuestion[],
  topics: string[],
}

export enum LEVEL{
  basico = 'básico',
  intermedio = 'intermedio',
  dificil = 'difícil'
}

interface ICreateQuestion{
  name: string,
  answer1: string,
  answer2: string,
  feedback1: string,
  feedback2: string,
  feedback3: string,
  feedback4: {
    options:string[],
    responseIndex: number,
  },
  feedback5: string,
  colorFeedback: string,
  topic: string,
  level: string,
  _teacher: string
}

interface IUpdateQuestion{
  _id: string,
  name: string,
  answer1: string,
  answer2: string,
  feedback1: string,
  feedback2: string,
  feedback3: string,
  feedback4: {
    options:string[],
    responseIndex: number,
  },
  feedback5: string,
  colorFeedback: string,
  topic: string,
  level: string,
}

export const useQuestionStore = defineStore('question',{
  state:():IState=>({
    questions: [],
    topics: []
  }),
  actions:{
    async getAllByTeacher(idTeacher:string){
      const {data} = await useFetch(`/api/question/${idTeacher}`)
      this.questions = data.value as IQuestion[]
    },

    async getAllTopics(){
      const {data} = await useFetch(`/api/topic`)
      this.topics = data.value as string[]      
    },

    async create(body:ICreateQuestion){
      await useFetch('/api/question',{
        method:'POST',
        body
      })
    },

    async updateQuestion(body:IUpdateQuestion){
      await useFetch('/api/question',{
        method:'PATCH',
        body
      })
    },

    async deleteQuestion(id:string){
      const {data} = await useFetch(`/api/question/delete/${id}`,{method:'DELETE'})
      if(data.value){
        this.questions = this.questions.filter(x => x._id !== id)
      }
    },
  }
})