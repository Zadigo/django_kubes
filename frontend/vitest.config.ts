import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue()
  ],
  test: {
    globals: true,
    setupFiles: './tests/setup.ts',
    environment: 'jsdom',
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ],
    workspace: [
      {
        test: {
          name: 'unit',
          include: ['tests/unit/**/*.{test,spec}.ts'],
          environment: 'jsdom'
        }
      },
      {
        test: {
          name: 'vite',
          include: ['tests/vite/**/*.{test,spec}.ts'],
          environment: 'jsdom'
        }
      }
    ]
  }
})
