import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig, mergeConfig, defineProject } from 'vitest/config'
import path from 'node:path'
import viteConfig from './vite.config'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { unheadVueComposablesImports } from '@unhead/vue'
import autoImport from 'unplugin-auto-import/vite'

export default mergeConfig(
  viteConfig,
  defineConfig({
    root: fileURLToPath(new URL('./src/__tests__', import.meta.url)),
    test: {
      globals: true,
      testTimeout: 20000,
      exclude: [ ...configDefaults.exclude, 'e2e/**' ],
      coverage: {
        enabled: true
      },
      projects: [
        defineProject({
          plugins: [
            vue(), 
            vueJsx(),
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
                  'vue-router': [ 'useRouter', 'useRoute' ]
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
          test: {
            name: 'unit',
            include: ['unit/**/*.{spec,test}.ts'],
            alias: {
              '@': path.resolve(__dirname, 'src')
            },
            environment: 'happy-dom',
            testTimeout: 20000
          }
        }),
        // defineProject({
        //   test: {
        //     name: 'e2e',
        //     include: ['e2e/*.{test,spec}.ts'],
        //     environment: 'jsdom'
        //   }
        // }),
        defineProject({
          test: {
            name: 'integration',
            include: ['integration/**/*.{test,spec}.ts'],
            alias: {
              '@': path.resolve(__dirname, 'src')
            },
            environment: 'jsdom'
          }
        })
      ]
    }
  })
)
