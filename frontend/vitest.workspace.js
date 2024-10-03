import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  'packages/*',
  {
    test: {
      name: 'project_management_store_ts',
      environment: 'happy-dom',
      include: ['tests/**/*.{browser}.test.{ts,js}'],
    }
  }
])
