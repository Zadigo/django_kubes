import index from '../pages/index.vue'
import firebasePlugin from './mocks/firebasePlugin'
import primevue from './mocks/primevue'

import { mountSuspended, renderSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { screen, fireEvent } from '@testing-library/vue'

describe('Index Page', () => {
  it('should mount correctly', async () => {
    const component = await mountSuspended(index, {
      global: {
        plugins: [primevue, firebasePlugin]
      }
    })
    expect(component.text()).toMatchInlineSnapshot('"Bienvenu ! Django #1 Celery  Django #2 Kubes  FR  EN  ES false Test se connecter"')
  })

  it('form can be submitted', async () => {
    await renderSuspended(index)
    expect(screen.getByText('Bienvenu !')).toBeDefined()

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    await fireEvent.update(emailInput, 'test@gmail.com')
    await fireEvent.update(passwordInput, 'touparet')
    
  })
})
