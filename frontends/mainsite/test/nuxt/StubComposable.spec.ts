import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect, vi } from 'vitest'
import { useForTesting } from '~/composables/for_testing'

import ForTestingComponent from '~/components/ForTesting.vue'

// Mocks a composable for testing purposes
// vi.mock('~/composables/for_testing', () => {
//   return {
//     useForTesting: vi.fn().mockReturnValue({
//       isTesting: ref(true),
//       toggle: vi.fn()
//     })
//   }
// })

// vi.mock('~/composables/for_testing', () => { 
//   const useForTesting = vi.fn().mockReturnValue({
//     isTesting: ref(true),
//     toggle: vi.fn()
//   })
//   return {s
//     useForTesting
//   }
// })

// vi.mock('~/composables/for_testing', async (original) => {
//   const actual = await original<typeof import('~/composables/for_testing')>()

//   const useForTesting = vi.fn().mockReturnValue({
//     isTesting: ref(true),
//     toggle: vi.fn()
//   })

//   return {
//     ...actual,
//     useForTesting
//   }
// })

describe('ForTesting', () => {
  it('should stub the useForTesting composable', async () => {
    const component = await mountSuspended(ForTestingComponent, {
      props: {
        message: 'Hello, World!'
      }
    })
    expect(component.find('#state')).toBeDefined()

    component.find('#search').trigger('click')
    console.log(component.html())
  })
})
