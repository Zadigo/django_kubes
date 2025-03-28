/// <reference types='vitest' />

import { dirname, resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath } from 'url'

import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import vueI18n from '@intlify/unplugin-vue-i18n/vite'
import unheadAddons from '@unhead/addons/vite'
import { VitePWA } from 'vite-plugin-pwa'

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
      environment: 'happy-dom'
    }
  }
})
