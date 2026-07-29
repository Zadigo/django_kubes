import { useHead } from '@unhead/vue'
import { App, Plugin } from 'vue'
import type { AnalyticsOptions, TagOptions } from './types'
import { resolveTags } from './utils'
// import createDevTool from './devtools'

export * from './composables'
export * from './mocks'
export * from './types'

export function initializeGtag(tags: TagOptions[]) {
  window.dataLayer = window.dataLayer || []

  for (const tag of tags) {
    for (const command of tag.commands ?? []) {
      gtag(...command)
    }
  }

  gtag('js', new Date())

  for (const tag of tags) {
    gtag('config', tag.id, tag.config ?? {})
  }
}

export function createAnalytics(options: AnalyticsOptions): Plugin {
  const tags = resolveTags(options)
  const dom: Document | undefined = typeof window !== 'undefined' ? document : undefined
  const loadingStrategy = options.loadingStrategy === 'async' ? 'async' : 'defer'

  if (!tags.length) {
    return
  }

  if (!dom) {
    return
  }

  initializeGtag(tags)

  if (options.mode === 'manual') {
    return
  }

  return {
    install(app: App) {
      // createDevTool(app)
      // app.provide('analyticsOptions', options)
      app.mixin({
        provide: {
          analyticsOptions: options
        },
        computed: {
          testTest() {
            return []
          }
        }
      })
      app.runWithContext(() => {
        useHead({
          link: [
            {
              rel: 'preload',
              as: 'script',
              href: 'https://www.googletagmanager.com/gtag/js'
            }
          ],
          script: [
            {
              'src': 'https://www.googletagmanager.com/gtag/js',
              [loadingStrategy]: true,
              'data-gtag': ''
            }
          ]
        })
      })
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export function gtag(...args: any[]) {
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer?.push(arguments)
}
