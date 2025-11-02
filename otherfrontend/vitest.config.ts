import path from 'node:path'
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    testTimeout: 1000
  },
  resolve: {
    alias: {
      'firebase/app': path.resolve(__dirname, 'tests/mocks/firebase/app.ts'),
      'firebase/database': path.resolve(__dirname, 'tests/mocks/firebase/database.ts')
    }
  }
})
