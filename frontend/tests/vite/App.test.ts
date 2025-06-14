import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../../src/App.vue'

describe('App component', () => {
  it('should render correctly', async () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Bienvenue sur Vite')
  })
})
q
