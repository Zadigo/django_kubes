import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginBlock from '../../components/LoginBlock.vue'

describe('App', () => {
  it('should work', () => {
    const component = mount(LoginBlock)
    console.log('html', component.html())
  })
})
