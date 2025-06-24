import { vi } from 'vitest' 

export const initializeApp = vi.fn(() => ({
  name: 'mock-app',
  options: {}
}))
