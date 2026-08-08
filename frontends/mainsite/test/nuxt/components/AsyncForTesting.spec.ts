import { describe, it, expect, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AsyncForTestingComponent from '~/components/AsyncForTesting.vue'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import type { NitroFetchRequest } from 'nitropack'

// vi.stubGlobal('$fetch', () => vi.fn())

// mockNuxtImport('$fetch', () => vi.fn())

const mockFetch = vi.hoisted(() => {
  return {
    fetch: vi.fn().mockImplementation((url: NitroFetchRequest) => {
      if (url === '/api/todo') {
        return Promise.resolve({ data: 'Mocked Data' })
      }
      return Promise.reject(new Error('Not Found'))
    })
  }
})

mockNuxtImport('$fetch', () => mockFetch.fetch)

describe('AsyncForTesting', () => {
  it('should stub the $fetch function', async () => {
    const component = await mountSuspended(AsyncForTestingComponent, {
      props: {
        message: 'Hello, World!'
      }
    })
    expect(component.find('#state')).toBeDefined()

    mockFetch.fetch.mockResolvedValueOnce({ data: 'Mocked Data' })
    console.log(component.html())
  })
})
