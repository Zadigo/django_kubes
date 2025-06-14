import { vi } from 'vitest'

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: vi.fn(key => key)
  })
}))

vi.mock('@unhead/vue', () => {
  return {
    useHead: vi.fn(),
    useSeoMeta: vi.fn()
  }
})
