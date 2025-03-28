import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'

describe('App component', () => {
  it.todo('should render correctly', async () => {
    const { getByText } = render(App)
    expect(getByText('Bienvenue sur Vite')).toBeTruthy()
  })
})
