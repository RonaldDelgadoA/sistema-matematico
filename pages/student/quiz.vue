<template>
  <VContainer v-if="currentQuestion">
    <VRow>
      <VCol>
        <p>Intentos restantes: {{ 5 - attemps }}</p>
        <p>
          Nivel: {{ currentQuestion?.level }}<br>
          Tema: {{ currentQuestion?.topic }}
        </p>
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <VForm
          @submit.prevent="handleSubmit"
          ref="formRef"
        >
          <h2
            v-html="convertLatexInlineToHtml(currentQuestion!.name)"></h2>
          <VDivider class="mb-3"/>
          <VRow v-if="feedback && attemps !== 4">
            <VCol>
              <VCard :color="currentQuestion.colorFeedback">
                <VCardTitle>
                  <h3>Retroalimentación {{ attemps }}</h3>
                </VCardTitle> 
                <VCardText>
                  <div v-html="convertLatexInlineToHtml(feedback as string)"></div>
                </VCardText>

              </VCard>
            </VCol>
          </VRow>
          <VRow>
            <VCol v-if="attemps !== 4">
              <VTextarea 
                class="my-3"
                label="Respuesta"
                variant="outlined"
                v-model.trim="answer"
                rows="3"
                max-rows="5"
                auto-grow
                :rules="[(v) => !!v || 'Campo obligatorio']"
              />
            </VCol>
            <VCol v-else-if="attemps === 4">
              <VRadioGroup
                v-model="answer"
                :rules="[(v) => v!=='' || 'Campo obligatorio']"
                >
                  <VRadio 
                    v-for="(item, index) in feedback"
                    :value="index"
                    :label="item"
                    >
                    <template v-slot:label>
                      <span v-html="convertLatexToHtml(item)"></span>
                    </template>
                  </VRadio>
              </VRadioGroup>
            </VCol>
              <!-- <VCol>
                <div v-html="convertLatexToHtml(answer)"></div>
              </VCol> -->
          </VRow>
          <VBtn
            type="submit"
            :loading="loading"
          >Enviar respuesta</VBtn>
          </VForm>
      </VCol>
    </VRow>
    <VDialog
      v-model="showDialog"
      persistent
    >
      <VCard :color="currentQuestion.colorFeedback" class="text-center pa-3">
        <VCardTitle>
          {{ titleDialog }}
        </VCardTitle>
        <VCardText v-if="!correct">
          <div v-html="convertLatexInlineToHtml(feedback as string)"></div>
        </VCardText>
        <v-card-actions>
          <v-btn color="error" block @click="navigateTo({path:'/student'})">Salir</v-btn>
        </v-card-actions>
      </VCard>
    </VDialog>
  </VContainer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { VForm } from 'vuetify/lib/components/index.mjs';

const answer = ref('')
const formRef = ref<VForm | null>(null)
const loading = ref(false)

const {data:session} = useAuth()
const quizStore = useQuizStore()
const {attemps, currentQuestion, feedback, correct} = storeToRefs(quizStore)

const showDialog = computed(()=>{
  return correct.value || attemps.value === 5 && !correct.value
})

const titleDialog = computed(()=>{
  if(correct.value){
    return 'Respuesta correcta 🎉🎉🎉!'
  }
  return 'Más suerte para la próxima 😥'
})

const handleSubmit = async()=>{
  loading.value = true
  const {valid} = await formRef.value!.validate()

  if(valid){
    attemps.value == 0 ?
      await quizStore.sendAnswer({
        _student: (session.value as any)._id, 
        value: answer.value
      }) :
      await quizStore.sendAnswerWithFeedback(answer.value)
  }
  answer.value = ''
  formRef.value?.reset()
  loading.value = false
}

await quizStore.getQuestion((session.value as any)?._id)
if(!currentQuestion.value){
  alert('No hay preguntas disponibles por el momento!')
  navigateTo({path:'/student'})
} 
  
</script>

<style scoped>

</style>