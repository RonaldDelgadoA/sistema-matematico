<template>
  <VContainer 
    class="d-flex align-center justify-center"
    style="height: 90vh;">
    <VCard class="pa-5">
      <VCardText>
        <VRow>
          <VCol>
            <img src="../assets/logo.png">
          </VCol>
        </VRow>
        <VRow class="justify-center">
          <VCol cols="auto">
            <VBtn
              class="mx-auto"
              variant="elevated"
              @click="loginWithMicrosoft/*navigateTo('teacher/dashboard')*/">
              <template v-slot:prepend>
                <img src="../assets/office.png" />
              </template>
              Login</VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VContainer>
</template>

<script setup lang="ts">
import { VBtn } from 'vuetify/lib/components/index.mjs';
const { status, data, signIn } = useAuth()
// 
const loginWithMicrosoft = async()=>{
  await signIn('azure-ad')
  
}

</script>

<style scoped>

</style>