import { useGtag as _useGtag } from '../composables'
import type { Gtag } from '../types'

export function useMockGtag(): ReturnType<typeof _useGtag> {
  const noop = () => { }

  return {
    gtag: noop as Gtag,
    enable: noop,
    disable: noop
  }
}
