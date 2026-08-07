import { describe, it, expect, vi } from 'vitest'
import { renderSuspended } from  '@nuxt/test-utils/runtime'
import ForTestingPage from '~/pages/for-tests.vue'

vi.mock('~/components/ForTesting.vue', () => ({
  default: defineComponent({
    template: '<div>Replacement item</div>'
  })
}))

describe('IsolationStrategy', () => {
  it('should render the page by removing child components', async () => {
    const component = await renderSuspended(ForTestingPage)
    expect(component.findByText('Replacement item')).toBeDefined()
  })
})
