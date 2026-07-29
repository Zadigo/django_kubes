import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig, mergeConfig, defineProject } from 'vitest/config'
import path from 'node:path'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    root: fileURLToPath(new URL('./src/__tests__', import.meta.url)),
    // test: {
    //   environment: 'jsdom',
    //   exclude: [...configDefaults.exclude, 'e2e/**'],
    //   root: fileURLToPath(new URL('./', import.meta.url)),
    //   testTimeout: 10_000
    // }
    test: {
      globals: true,
      testTimeout: 20000,
      exclude: [ ...configDefaults.exclude, 'e2e/**' ],
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      coverage: {
        enabled: true
      },
      projects: [
        defineProject({
          test: {
            name: 'unit',
            include: ['__tests__/unit/**/*.{spec,test}.ts'],
            environment: 'node',
            testTimeout: 20000
          }
        }),
        defineProject({
          test: {
            name: 'e2e',
            include: ['__tests__/e2e/*.{test,spec}.ts'],
            environment: 'node'
          }
        }),
        defineProject({
          test: {
            name: 'integration',
            include: ['__tests__/integration/**/*.{test,spec}.ts'],
            environment: 'jsdom'
          }
        })
      ]
    }
  })
)
