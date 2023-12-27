// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  imports:{
    dirs:['store']
  },
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  build: {
    transpile: ['vuetify']
  },
  modules:[
    '@pinia/nuxt',
    '@sidebase/nuxt-auth',
  ],
  runtimeConfig:{
    public:{
      MONGO_URI: process.env.MONGO_URI
    },
    AZURE_CLIENTID: process.env.AZURE_CLIENTID,
    AZURE_CLIENTSECRET: process.env.AZURE_CLIENTSECRET,
    AZURE_TENANTID: process.env.AZURE_TENANTID,
    SECRET: 'Sistema matemático'
  },
  auth:{
    origin: process.env.DOMAIN,
  },
  
})
