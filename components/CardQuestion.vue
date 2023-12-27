<template>
  <VCard 
    width="300"
    elevation="5">
    <VCardTitle>
      {{ capitalize(question.topic) }}
    </VCardTitle>
    <VCardSubtitle>
      <VRow>
        <VCol>
          {{ question.level }}
        </VCol>
        <VSpacer/>
        <VCol>
          {{ new Date(question.createAt).toLocaleDateString() }}
        </VCol>              
      </VRow>
    </VCardSubtitle>
    <VCardText>
      <div v-html="convertLatexInlineToHtml(question.name)"></div>
    </VCardText> 
    <VDivider/>
    <VCardActions>
      <VBtn 
        title="Ver"
        color="warning" 
        @click="$emit('editQuestion',question._id)"
        icon="mdi-eye"/>
      <VBtn 
        title="Eliminar"
        color="red" 
        @click="$emit('confirmDelete', question)"
        icon="mdi-delete"/>
    </VCardActions>
  </VCard>
</template>

<script setup lang="ts">
import {capitalize} from "vue";

defineProps<{question: IQuestion}>()
defineEmits<{
  (e:'confirmDelete', question: IQuestion): void,
  (e:'editQuestion', id: string): void
}>()

</script>

<style scoped>

</style>