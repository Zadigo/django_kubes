import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers'
import { unheadVueComposablesImports } from '@unhead/vue'
import tailwindcss from '@tailwindcss/vite'
import autoImport from 'unplugin-auto-import/vite'
import unpluginViteComponents from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss({ optimize: true }),
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
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
