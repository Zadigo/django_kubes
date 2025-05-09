/// <reference types='vitest' />

import { dirname, resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath } from 'url'
import { VitePWA } from 'vite-plugin-pwa'
import { unheadVueComposablesImports } from '@unhead/vue'
import { sentryVitePlugin } from '@sentry/vite-plugin'

import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import vueI18n from '@intlify/unplugin-vue-i18n/vite'
import unheadAddons from '@unhead/addons/vite'
import unpluginViteComponents from 'unplugin-vue-components/vite'
import tailwind from '@tailwindcss/vite'
import autoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  process.env = { ...process.env, ...env }

  return {
    root,
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, 'src')
        },
        {
          find: 'src',
          replacement: resolve(__dirname, 'src')
        }
      ]
    },
    plugins: [
      vue(),
      eslint(),
      unheadAddons(),
      tailwind(),
      sentryVitePlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: 'jpm-holdings',
        project: 'javascript-vue'
      }),
      unpluginViteComponents({
        deep: true,
        dts: 'src/types/components.d.ts',
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
        imports: [
          'vue',
          'pinia',
          '@vueuse/core',
          'vue-i18n',
          unheadVueComposablesImports
        ],
        dirs: [
          'src/plugins',
          'src/stores',
          'src/composables'
        ]
      }),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: false,

        pwaAssets: {
          disabled: false,
          config: true
        },
        manifest: {
          name: 'Frontend',
          short_name: 'Frontend',
          description: 'Frontend application',
          theme_color: '#ffffff'
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
          cleanupOutdatedCaches: true,
          clientsClaim: true
        },
        devOptions: {
          enabled: false,
          navigateFallback: 'index.html',
          suppressWarnings: true,
          type: 'module'
        }
      }),
      vueI18n({
        include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**'),
        fullInstall: false,
        compositionOnly: true
      })
    ],
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: './tests/setup.ts'
    }
  }
})
