<template>
  <VContainer>
    <VRow>
      <VCol>
        Nivel: Básico
      </VCol>
    </VRow>
    <VRow justify="center" align="center" style="height: 80vh; ">
      <VCol cols="auto">
        <VBtn 
          elevation="5"
          size="x-large"
          @click="navigateTo('/student/quiz')">
            <template #prepend>
              <VIcon icon="mdi-form-select"/> 
            </template>
          Resolver pregunta
        </VBtn>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>