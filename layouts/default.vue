<template>
  <VApp>
    <NavBar/>
    <VMain>
      <slot></slot>
    </VMain>
  </VApp>
</template>

<script setup lang="ts">
import { VApp, VMain } from 'vuetify/lib/components/index.mjs';

useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'stylesheet',
      href: "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css",
      crossorigin: 'anonymous',
      integrity: "sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn"
    }
  ]
})
</script>

<style scoped>

</style>