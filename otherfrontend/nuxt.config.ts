import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  sourcemap: false,

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  },

  routeRules: {
    '/': { swr: true },
    '/django/celery': { swr: true },
    '/django/kubes': { ssr: false },
    '/test-build': { ssr: true }
  },

  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    '@nuxt/test-utils/module',
    'nuxt-vuefire'
  ],
  
  css: [
    '~/assets/css/tailwind.css'
  ],

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
      prodDomain: process.env.NUXT_PUBLIC_PRODUCTION_DOMAIN || 'http://localhost:3000',
      djangoProdDomain: process.env.NUXT_PUBLIC_DJANGO_PROD_DOMAIN
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
        name: 'Sora',
        weight: '100..800'
      },
      {
        name: 'Geist',
        weight: '100..900'
      }
    ]
  },
  
  i18n: {
    baseUrl: './',
    langDir: './locales',
    defaultLocale: 'fr',
    vueI18n: './i18n.config.ts',
    bundle: {
      // TODO: Remove on major update of i18n
      // https://github.com/nuxt-modules/i18n/issues/3435
      optimizeTranslationDirective: false
    },
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
        host: process.env.NUXT_PUBLIC_REDIS_HOST,
        port: 6379,
        username: '',
        password: process.env.NUXT_PUBLIC_REDIS_PASSWORD
      }
    }
  }
})
