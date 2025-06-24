import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  sourcemap: true,

  site: {
    url: process.env.NUXT_SITE_URL || 'http://localhost:3000'
  },

  routeRules: {
    '/': { swr: true },
    '/django/celery': { swr: true },
    '/django/kubes': { ssr: false }
  },

  vite: {
    plugins: [
      tailwindcss()
    ],
    build: {
      sourcemap: true
    }
  },
  
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    '@nuxt/test-utils/module'
  ],
  
  css: [
    '~/assets/css/tailwind.css'
  ],
  
  runtimeConfig: {
    public: {
      prodDomain: process.env.NUXT_PRODUCTION_DOMAIN || 'http://localhost:3000',
      djangoProdDomain: process.env.NUXT_DJANGO_PROD_DOMAIN,
      
      // Firebase
      // firebaseApiKey: process.env.NUXT_FIREBASE_API_KEY,
      // firebaseAuthDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
      // firebaseDbUrl: process.env.NUXT_FIREBASE_DB_URL,
      // firebaseStorageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
      // firebaseAppId: process.env.NUXT_FIREBASE_APP_ID,
      // firebaseMeasurementId: process.env.NUXT_FIREBASE_MEASUREMENT_ID,
      // firebaseMessageSenderId: process.env.NUXT_FIREBASE_MESSAGE_SENDER_ID,
      // firebaseProjectId: process.env.NUXT_FIREBASE_PROJECT_ID
    }
  },

  eslint: {
    config: {
      stylistic: true
    }
  },

  fonts: {
    provider: 'google',
    families: [
      {
        name: 'Manrope',
        weight: '200..800'
      },
      {
        name: 'Merriweather',
        weight: '300..900'
      }
    ]
  },
  
  i18n: {
    baseUrl: './',
    langDir: './locales',
    defaultLocale: 'fr',
    // vueI18n: './i18n.config.ts',
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
  
  nitro: {
    storage: {
      redis: {
        driver: 'redis',
        host: process.env.NUXT_REDIS_HOST,
        port: 6379,
        username: '',
        password: process.env.NUXT_REDIS_PASSWORD
      }
    }
  }
})
