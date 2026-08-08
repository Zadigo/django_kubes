import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

describe('Node: Isolated within Component', () => {
  it('should be true when toggled', async () => {
    const component = defineComponent({
      template: '<div>{{ isTesting }}</div>',
      setup() {
        const { isTesting, toggle } = useForTesting()
        return { isTesting, toggle }
      },
    })

    const wrapper = mount(component)
    expect(wrapper.text()).toBe('false')
  })
})
