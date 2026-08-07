import { describe, it, expect } from 'vitest'
import { useForTesting } from '../../app/composables/for_testing'

describe('ForTesting', () => {
  it('should be true when toggled', () => {
    const { isTesting, toggle } = useForTesting()
    expect(isTesting.value).toBe(false)

    toggle()
    
    expect(isTesting.value).toBe(true)
  })
})
