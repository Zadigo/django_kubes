import index from '../pages/index.vue'
import firebasePlugin from './mocks/firebasePlugin'
import primevue from './mocks/primevue'

import { mountSuspended, renderSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, beforeEach, vi, afterAll } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/vue'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthentication } from '../stores/authentication'
import { login } from '../utils'


// https://testing-library.com/docs/guide-disappearance
// https://medium.com/@natalia.afanaseva/effective-testing-strategies-for-complex-nuxt-applications-a7c1b5d72d9f#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjFiYjc3NGJkODcyOWVhMzhlOWMyZmUwYzY0ZDJjYTk0OGJmNjZmMGYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDAwODEzODY4Njc3NjI2MjU1MjkiLCJlbWFpbCI6InBlbmRlbnF1ZWpvaG5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTc1MDgwMjg1NywibmFtZSI6IksgSm9obiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLX0pOTFBBcW41Ym94UEcwbHpsNjRPVDZ1TnlBbHdMRnZNb1dTMmczTnZIWmdtX2tQN21RPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IksiLCJmYW1pbHlfbmFtZSI6IkpvaG4iLCJpYXQiOjE3NTA4MDMxNTcsImV4cCI6MTc1MDgwNjc1NywianRpIjoiYjY0ZDBmMWFmMzBlMWYxNTIwNzViODU4MzZkYmQyOGU1MzVlNWE4MyJ9.F8hlxLVB4v1xe_XxsLu31XSDRdCKnvk5yS1LvQrHqgNKTGJ_n7T6uh5wnMZKCfm7ZFA38wkrZsvIlpyQHExzkqDb71LmnRBV7xuLzEC3SPyI3oFBaMTJecgZP7ZV__oY7MFzPQnYcN-7Lrk18cnemzDSx-GnUyUDxqaxpzcWuTbxdjvA_kDZoaFSvm22Cbl3BWUFOGO_nHSdniky4LMkJqiJPKr5-tQSX3i11ghm7tt9eW8o4EHEPZCuRH0UKLC3HrbjWkDBtnev3BXJsse-znQXeDFREJIBkCY7bc7TcdXVwQJD5b4fY9p1shEtV45VXozc0se4H1n6J9eM3BjCvw

// vi.mock('../utils', () => ({
//   login: vi.fn(() => ({
//     accessToken: 'access',
//     refreshToken: 'refresh',
//     failureCount: 0
//   }))
// }))

describe('Index Page', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  // afterAll(() => {
  //   vi.restoreAllMocks()
  // })

  it('should mount correctly', async () => {
    const component = await mountSuspended(index, {
      global: {
        plugins: [primevue, firebasePlugin]
      }
    })
    expect(component.text()).toMatchInlineSnapshot('"Not AuthenticatedTest se connecter"')
  })

  // TODO: Mock login
  it('form can be submitted', async () => {
    await renderSuspended(index)
    
    expect(screen.queryByText('Not Authenticated')).toBeTruthy()
    
    const button = screen.getByText('Test se connecter')
    expect(button.attributes.getNamedItem('disabled')).toBeDefined()
    
    const emailInput = screen.getByPlaceholderText('Username')
    const passwordInput = screen.getByPlaceholderText('Password')
    
    await fireEvent.update(emailInput, 'test@gmail.com')
    await fireEvent.update(passwordInput, 'touparet')
    expect(button.attributes.getNamedItem('disabled')).toBeNull()
    await fireEvent.click(button)

    // await waitFor(() => {
    //   expect(screen.getByText('Authenticated')).toBeDefined()
    // })

    // const authStore = useAuthentication()
    // expect(authStore.isAuthenticated).toBe(true)
    // expect(screen.getByText('Se déconnecter')).toBeTruthy()
  })
})
