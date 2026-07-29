import { vi } from 'vitest'

export default defineNuxtPlugin(() => {
  const mockApp = {
    name: 'mock-app',
    options: {}
  }

  const mockDb = {
    ref: vi.fn(() => ({
      set: vi.fn(),
      get: vi.fn(),
      onValue: vi.fn()
    }))
  }

  return {
    provide: {
      fireApp: mockApp,
      fireDb: mockDb
    }
  }
})
