/* eslint-disable @typescript-eslint/no-explicit-any */

import { toRaw } from 'vue'
import type { AnalyticsOptions, TagOptions } from './types'

export function enableTracking(id: string) {
  const key = `ga-disable-${id}`

  if (key in window) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete (window as any)[key]
  }
}

export function disableTracking(id: string) {
  (window as any)[`ga-disable-${id}`] = true
}

export function resolveTags(options: AnalyticsOptions): TagOptions[] {
  const rawOptions = toRaw(options)
  let tags: TagOptions[] = []

  if (rawOptions.tags) {
    tags = rawOptions.tags.map((x) => {
      if (typeof x === 'string') {
        return {
          id: x
        }
      } else {
        return x
      }
    })
  }

  if (options.id) {
    const newTag: TagOptions = { id: options.id }
    tags.unshift(newTag)
  }

  return tags
}

export function addQuery(url: string, name: string, value: string): string {
  const obj = new URL(url)
  obj.searchParams.append(name, value)
  return obj.toString()
}
