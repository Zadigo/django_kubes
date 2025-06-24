import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import index from '../pages/index.vue'

describe('basic test', () => {
  it('to run basic test', async () => {
    const component = await mountSuspended(index)
    expect(component.text()).toMatchInlineSnapshot('google')
  })
})
