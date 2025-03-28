import type { AxiosInstance } from 'axios'
import { afterEach, beforeEach, describe, expect, expectTypeOf, it, vi } from 'vitest'
import { createSimpleClient, getDomain, inProduction, useAuthenticatedAxiosClient, useAxiosClient } from '../src/plugins'

describe('test development Axios modules', () => {
  beforeEach(() => {
    vi.stubEnv('NODE_ENV', 'development')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('should be in development mode', () => {
    expect(import.meta.env.NODE_ENV).toEqual('development')
  })

  it('should return false', () => {
    expect(inProduction()).toBe(false)
  })

  it('should get domain', () => {
    const domain = getDomain()
    expect(domain).toEqual('http://127.0.0.1:8000/')
  })

  it('should return an Axios client', () => {
    const client = createSimpleClient()
    expect(client).toHaveProperty('get')
    expect(client).toHaveProperty('post')
    expectTypeOf(client).toEqualTypeOf<AxiosInstance>()
  })

  it('composable useAxiosClient should return client', () => {
    const { client } = useAxiosClient()
    expect(client).toHaveProperty('get')
    expect(client).toHaveProperty('post')
    expectTypeOf(client).toEqualTypeOf<AxiosInstance>()
  })

  it('composable useAuthenticatedAxiosClient should return client', () => {
    const { authenticatedClient } = useAuthenticatedAxiosClient('', '')
    expect(authenticatedClient).toHaveProperty('get')
    expect(authenticatedClient).toHaveProperty('post')
    expectTypeOf(authenticatedClient).toEqualTypeOf<AxiosInstance>()
  })
})

describe('test production Axios modules', () => {
  it('should return alternative domain', () => {
    const altDomain = getDomain('example.com')
    expect(altDomain).toEqual('https://example.com/')
  })

  it.skip('client should resolve', async () => {
    const { client } = useAxiosClient('jsonplaceholder.typicode.com')
    const expectedData = {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false
    }

    async function proxyRequest() {
      const response = await client.get('/todos/1')
      return response.data
    }

    await expect(proxyRequest()).resolves.toEqual(expectedData)
  })
})
