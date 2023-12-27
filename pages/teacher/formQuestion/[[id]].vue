<template>
  <VContainer>
    <VBtn 
      target="_blank"
      href="https://katex.org/docs/supported.html"
      >Ver documentación de katex</VBtn>
    <VRow>
      <VCol>
        <VForm
          ref="formRef"
          @submit.prevent="handleSubmit"
        >
          <h3 class="text-h4 mb-3">{{title}}</h3>
          <VTextarea 
            v-model.trim="question.name"
            clearable 
            variant="outlined"
            label="Enunciado"
            max-rows="7"
            rows="1"
            :rules="rules.name"
            auto-grow
          />
          <VTextarea 
          v-model.trim="question.answer1"
          class="mt-2"
          variant="outlined"
            clearable 
            label="Respuesta"
            max-rows="7"
            rows="1"
            :rules="rules.required"
            >
          </VTextarea>
          <VTextarea 
            v-model.trim="question.answer2"
            class="mt-2"
            variant="outlined"
            clearable 
            label="Respuesta 2 (Opcional)"
            max-rows="7"
            rows="1"
          >
          </VTextarea>
          <VSelect
            v-model="question.topic"
            label="Seleccione el tema"
            variant="outlined"
            class="mt-2"
            :items="topics"
            :rules="rules.feedback"
          />
          <VSelect
            v-model="question.level"
            label="Seleccione el nivel"
            variant="outlined"
            class="mt-2"
            :items="levels"
            :rules="rules.feedback"
          />
          <VLabel>Color de la retroalimentación</VLabel>
          <v-color-picker
            v-model="question.colorFeedback"
            elevation="15"
          ></v-color-picker>
          <VTextarea 
            v-model.trim="question.feedback1"
            class="mt-5"
            clearable 
            variant="outlined"
            label="Retroalimentación 1"
            max-rows="7"
            :rules="rules.feedback"
            auto-grow
            rows="1"
          />
          <VTextarea 
            v-model.trim="question.feedback2"
            clearable 
            variant="outlined"
            label="Retroalimentación 2"
            max-rows="7"
            :rules="rules.feedback"
            rows="1"
            auto-grow
            class="mt-2"
          />
          <VTextarea 
            v-model.trim="question.feedback3"
            class="mt-2"
            clearable 
            variant="outlined"
            label="Retroalimentación 3"
            max-rows="7"
            rows="1"
            :rules="rules.feedback"
            auto-grow
          />
          <VTextarea 
            v-model.trim="option"
            clearable 
            class="mt-2"
            variant="outlined"
            label="Retroalimentación 4"
            max-rows="3"
            rows="1"
            :rules="rules.feedback4"
            auto-grow
          >
            <template v-slot:append>
              <VBtn 
                @click="addOptionFeedback4"
                icon="mdi-plus"/>
            </template>
          </VTextarea>
          <VRadioGroup
            v-model="question.feedback4.responseIndex"
            >
            <VRadio 
              v-for="(option,index) in question.feedback4.options"
              :value="index" 
              :label="option"
              >
              <template #label="{label}">
                {{ label }}
                <span
                  class="ms-3" 
                  style="font-size: 12px;"
                  @click="question.feedback4.options =  question.feedback4.options.filter(x => x !== label)">
                  ❌
                </span>
              </template>
            </VRadio>
          </VRadioGroup>
          <VTextarea 
            v-model.trim="question.feedback5"
            clearable 
            class="mt-2"
            variant="outlined"
            label="Retroalimentación 5"
            max-rows="7"
            rows="1"
            :rules="rules.feedback"
            auto-grow
          />
          <VBtn 
            class="w-100"
            type="submit"
            color="primary"
            :loading="loading"
          >Guardar</VBtn>
          <VBtn 
            class="w-100 mt-2"
            color="error"
            @click="handleCancel"
            :disabled="loading"
          >Cancelar</VBtn>
        </VForm>
      </VCol>
      <VCol>
        <h3 class="text-h4 text-grey">Visualización</h3>
        <template v-if="question.name">
          <p class="text-h6">Enunciado:</p>
          <div v-html="convertLatexInlineToHtml(question.name)"></div>
          <VDivider class="my-3"/>
        </template>

        <template v-if="question.answer1">
          <p class="text-h6">Respuesta:</p>
          <div 
            v-html="convertLatexToHtml(question.answer1)">
          </div>
          <VDivider class="my-3"/>
        </template>

        <template v-if="question.answer2">
          <p class="text-h6">Respuesta 2:</p>
          <div 
            v-html="convertLatexToHtml(question.answer2)">
          </div>
          <VDivider class="my-3"/>
        </template>

        <template v-if="question.topic">
          <p class="text-h6">Tema: {{ question.topic }}</p>
          <VDivider class="my-3"/>
        </template>

        <template v-if="question.level">
          <p class="text-h6">Nivel: {{ question.level }}</p>
          <VDivider class="my-3"/>
        </template>

        <template v-if="question.feedback1">
          <p class="text-h6">Retroalimentación 1: </p>
          <div v-html="convertLatexInlineToHtml(question.feedback1)"></div>
          <VDivider class="my-3"/>
        </template>

        <template v-if="question.feedback2">
          <p class="text-h6">Retroalimentación 2: </p>
          <div v-html="convertLatexInlineToHtml(question.feedback2)"></div>
          <VDivider class="my-3"/>
        </template>

        <template v-if="question.feedback3">
          <p class="text-h6">Retroalimentación 3: </p>
          <div v-html="convertLatexInlineToHtml(question.feedback3)"></div>
          <VDivider class="my-3"/>
        </template>

        <template v-if="question.feedback4.options.length > 0 || option">
          <p class="text-h6">Retroalimentación 4:</p>
          <VRadioGroup
            v-model="question.feedback4.responseIndex"
            >
              <VRadio 
                v-for="(item, index) in question.feedback4.options"
                :value="index"
                :label="item"
                >
                <template v-slot:label>
                  <span v-html="convertLatexToHtml(item)"></span>
                </template>
              </VRadio>
              <div v-if="option">
                <span v-html="convertLatexToHtml(option)">
                </span>
                (Borrador)
              </div>
          </VRadioGroup>
        </template>

        <template v-if="question.feedback5">
          <p class="text-h6">Retroalimentación 5: </p>
          <div v-html="convertLatexInlineToHtml(question.feedback5)"></div>
          <VDivider class="my-3"/>
        </template>

      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { before } from 'node:test';
import { storeToRefs } from 'pinia';
import { VForm, VRadio } from 'vuetify/lib/components/index.mjs';

interface IQuestion{
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
  level: string,
  colorFeedback: string,
  topic: string,
  _teacher: string
}

const {data:session} = useAuth()
const question = reactive<IQuestion>({
  name: '',
  answer1: '',
  answer2: '',
  feedback1: '',
  feedback2: '',
  feedback3: '',
  feedback4: {
    options:[],
    responseIndex: 0
  },
  colorFeedback: '#AEF38A',
  topic: '',
  level: '',
  feedback5: '',
  _teacher: (session.value as any)?._id
})
const option = ref('')
const formRef = ref<VForm | null>(null)
const loading = ref(false)
const rules = {
  name:[
    (value: string)=>!!value || 'El enunciado es obligatorio'
  ],
  required:[
    (value: string)=>!!value || 'Campo obligatorio'
  ],
  feedback:[
    (value: string)=>!!value || 'campo obligatorio'
  ],
  feedback4:[
    (value: string)=> question.feedback4.options.length > 1 || 'campo obligatorio al menos debe tener dos opciones'
  ],
} 
const levels = ['básico','intermedio','difícil']
const questionStore = useQuestionStore()
const {create, getAllTopics, updateQuestion} = questionStore
const {topics} = storeToRefs(questionStore)
const route = useRoute()

const title = computed(()=> route.params.id ? 'Editar Pregunta':'Crear pregunta')
const getQuestionById = async()=>{
  if(route.params.id){
    const {data} = await useFetch(`/api/question/get-by-id/${route.params.id}`)
    if(data.value){
      Object.assign(question,{...data.value})
    }
  }
} 

const addOptionFeedback4 = ()=>{
  if(!option.value || question.feedback4.options.find(x => x === option.value)) return
  question.feedback4.options.push(option.value)
  option.value = ''
}

const handleSubmit = async()=>{
  loading.value = true
  const {valid} = await formRef.value!.validate()
  if(valid){
    const {id} = route.params
    id ? 
      await updateQuestion({...question, _id: id as string}): 
      await create({...question})
    navigateTo('/teacher')
  }
  loading.value = false
}

const handleCancel = ()=>{
  navigateTo('/teacher')
}

await getAllTopics()

await getQuestionById()
</script>

<style scoped>

</style>