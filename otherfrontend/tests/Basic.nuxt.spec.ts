import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import index from '../pages/index.vue'
import primevue from './mocks/primevue'

describe('basic test', () => {
  it('to run basic test', async () => {
    const component = await mountSuspended(index, {
      global: {
        plugins: [primevue]
      }
    })
    expect(component.text()).toMatchInlineSnapshot('"Bienvenu ! Django #1 Celery  Django #2 Kubes  FR  EN  ES Test se connecter"')
  })
})
