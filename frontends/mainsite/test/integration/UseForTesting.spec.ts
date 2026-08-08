import { describe, it, expect } from 'vitest'
import { useForTesting } from '../../app/composables/for_testing'
import { render } from '@testing-library/vue'
import { NuxtErrorBoundary } from '#components'

describe('Node: Isolated UseForTesting', () => {
  it('should be true when toggled', () => {
    const { isTesting, toggle } = useForTesting()
    expect(isTesting.value).toBe(false)

    toggle()
    
    expect(isTesting.value).toBe(true)
  })
})

describe('Node: Isolated within component', () => {
  it('should be true when toggled', () => {
    const wrapper = defineComponent({
      template: `
      <div>
        {{ isTesting }}
      </div>
      `,
      setup() {
        const { isTesting, toggle } = useForTesting()
        return { isTesting, toggle }
      },
    })

    const instance = render(wrapper)
    expect(instance.getByText('false')).toBeDefined()
  })
})
