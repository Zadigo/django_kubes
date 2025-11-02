import { fileURLToPath, URL } from 'node:url'
import vueI18n from '@intlify/unplugin-vue-i18n/vite'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import tailwind from '@tailwindcss/vite'
import unheadVite from '@unhead/addons/vite'
import { unheadVueComposablesImports } from '@unhead/vue'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import autoImport from 'unplugin-auto-import/vite'
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers'
import unpluginViteComponents from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    unheadVite(),
    tailwind(),
    sentryVitePlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: 'jpm-holdings',
      project: 'javascript-vue'
    }),
    vueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [fileURLToPath(new URL('./src/locales/**', import.meta.url))]
    }),
    unpluginViteComponents({
      deep: true,
      dts: 'src/types/components.d.ts',
      resolvers: [
        PrimeVueResolver({
          prefix: 'Volt'
        })
      ],
      dirs: [
        'src/components',
        'src/layouts'
      ],
      extensions: [
        'vue'
      ]
    }),
    autoImport({
      dts: 'src/types/auto-imports.d.ts',
      vueTemplate: true,
      eslintrc: {
        enabled: true,
        filepath: '.eslintrc-auto-import.json',
        globalsPropValue: true
      },
      imports: [
        'vue',
        'pinia',
        '@vueuse/core',
        'vue-i18n',
        {
          'vue-router': ['useRouter', 'useRoute']
        },
        {
          'vue-axios-manager': [
            'useRequest',
            'useAsyncRequest',
            'useAxiosLogin',
            'vueAxiosManager'
          ]
        },
        unheadVueComposablesImports
      ],
      dirs: [
        'src/plugins',
        'src/stores',
        'src/composables'
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
