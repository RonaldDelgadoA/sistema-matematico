<template>
  <VAppBar>
    <VAppBarTitle>
      Sistema matemático
    </VAppBarTitle>
    <VBtn
      title="Cambiar tema"
      :icon="iconTheme"
      @click="changeTheme()"
    />
    <VBtn 
      v-if="data"
      @click="logout"
      title="Salir"
      icon="mdi-logout"
      text="Cerrar Sesión" />
  </VAppBar>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify/lib/framework.mjs"

const theme = useTheme()
const { status, data, signIn, signOut,  } = useAuth()

const changeTheme = () => {
  theme.global.name.value =
    theme.global.name.value === "dark" ? "light" : "dark"
}

const logout = async()=>{
  await signOut(/*{redirect:false}*/)
}

const iconTheme = computed(() => {
  const value = theme.global.name.value
  return value === "dark" ? "mdi-weather-night" : "mdi-weather-sunny"
})

</script>

<style scoped>

</style>