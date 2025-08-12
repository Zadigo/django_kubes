// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,

  modules: [
    '@nuxt/fonts',
    '@nuxt/test-utils',
    '@nuxt/eslint',
    '@nuxt/scripts',
    '@nuxtjs/ionic'
  ]
})