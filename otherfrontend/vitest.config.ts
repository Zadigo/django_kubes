import { defineVitestConfig } from '@nuxt/test-utils/config'
import path from 'path'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    testTimeout: 1000,
    env: {}
  },
  resolve: {
    alias: {
      'firebase/app': path.resolve(__dirname, 'tests/firebase/app.ts'),
      'firebase/database': path.resolve(__dirname, 'tests/firebase/database.ts')
    }
  }
})
