import { describe, beforeEach, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthentication } from '../stores/authentication'

describe('Authentication Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('sets authethentication', () => {
    const authStore = useAuthentication()
    expect(authStore.accessToken).toBeUndefined()
    expect(authStore.isAuthenticated).toBe(false)
    
    authStore.accessToken = 'test-token'
    expect(authStore.isAuthenticated).toBe(true)
  })
})
