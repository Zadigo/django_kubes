import { vi } from 'vitest'

export const getDatabase = vi.fn(() => ({
  ref: vi.fn(() => ({
    set: vi.fn(),
    get: vi.fn(),
    onValue: vi.fn(),
  })),
  goOffline: vi.fn(),
  goOnline: vi.fn()
}))
