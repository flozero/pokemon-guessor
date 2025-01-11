// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  runtimeConfig: {
    database: {
      url: process.env.NUXT_DB_FILE_NAME
    }
  },
  nitro: {
    experimental: {
      tasks: true
    }
  }
})