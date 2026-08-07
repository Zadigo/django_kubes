// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/a11y',
    '@nuxt/scripts',
    '@vueuse/nuxt',
    '@nuxt/test-utils/module',
    '@nuxtjs/seo',
    'nuxt-vuefire',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    'nuxt-authentication',
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  vuefire: {
    config: {
      apiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      dbUrl: process.env.NUXT_PUBLIC_FIREBASE_DB_URL,
      storageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      appId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
      messageSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
      projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID
    }
  },

  runtimeConfig: {
    public: {
      prodDomain: process.env.NUXT_PUBLIC_PRODUCTION_DOMAIN,
      djangoProdDomain: process.env.NUXT_PUBLIC_DJANGO_PROD_DOMAIN
    }
  },

  i18n: {
    baseUrl: './',
    langDir: './locales',
    defaultLocale: 'fr',
    vueI18n: './i18n.config.ts',
    locales: [
      {
        code: 'en',
        language: 'en-US',
        file: 'en-US.json',
        dir: 'ltr',
        name: 'English'
      },
      {
        code: 'es',
        language: 'es-ES',
        file: 'es-ES.json',
        dir: 'ltr',
        name: 'Spanish'
      },
      {
        code: 'fr',
        language: 'fr-FR',
        file: 'fr-FR.json',
        dir: 'ltr',
        name: 'Français'
      }
    ]
  },

  imports: {
    dirs: [
      '~/constants'
    ]
  },

  fonts: {
    provider: 'google',
    families: [
      {
        name: 'Sora',
        weight: '100..800'
      },
      {
        name: 'Geist',
        weight: '100..900'
      }
    ]
  },

  ui: {
    theme: {
      colors: [
        'primary',
        'neutral',
        'error',
        'info',
        'success',
        'warning',
        'tertiary',
        'secondary',
      ]
    }
  }
})
