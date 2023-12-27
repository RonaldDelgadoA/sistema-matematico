<template>
  <VContainer>
    <VRow>
      <VCol>
        <VBtn
          color="primary"
          icon="mdi-plus"
          @click="navigateTo('/teacher/formQuestion')"
        /> 
      </VCol>
    </VRow>
    <VRow>
      <VCol 
        v-for="i in questions"
        :key="i._id"
        cols="auto"
      >
        <CardQuestion 
          :question="i"
          @confirm-delete="confirmDelete"
          @edit-question="handleEdit"
        />
      </VCol>
    </VRow>
  </VContainer>
  <VDialog
    v-model="showConfirmDelete"
    persistent
    max-width="450px"
  >
    <VCard>
      <VCardText>
        ¿Estás seguro de eliminar la pregunta?
      </VCardText>
      <VCardActions>
        <VSpacer/>
        <VBtn 
          variant="text"
          color="blue-darken-1"
          @click="questionDeleted = null"
          :disabled="loadingDelete"
        >Cancelar</VBtn>
        <VBtn 
          variant="text"
          color="blue-darken-1"
          type="submit"
          @click="handleDelete"
          :loading="loadingDelete"
        >Confirmar</VBtn> 
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

const {data} = useAuth()
const questionSotre = useQuestionStore()
const {getAllByTeacher, deleteQuestion} = questionSotre
const {questions} = storeToRefs(questionSotre)
const questionDeleted = ref<null | IQuestion>(null)
const loadingDelete = ref(false)
const showConfirmDelete = computed(()=> !!questionDeleted.value)

await getAllByTeacher((data.value as any)?._id)

const confirmDelete = (question:IQuestion)=>{
  questionDeleted.value = question
}

const handleDelete = async()=>{
  loadingDelete.value = true
  await deleteQuestion(questionDeleted.value!._id)
  loadingDelete.value = false
  questionDeleted.value = null
}

const handleEdit = (id:string)=>{
  navigateTo(`/teacher/formQuestion/${id}`)
}

</script>

<style scoped>
.line-card{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 48px;
  -webkit-line-clamp: 2; /* Número de líneas que deseas mostrar */
}
</style>