import { inject } from 'vue'
import { gtag, initializeGtag } from '..'
import type { AnalyticsOptions } from '../types/options'
import type { Gtag, GtagCommands } from '../types/commands'
import { disableTracking, enableTracking } from '../utils'
import { useHead } from '@unhead/vue'

/**
 * Composable runs fine grained functions/commmands on
 * a specific registered Google Analytics tag
 */
export function useGtag() {
  const options = inject<AnalyticsOptions>('analyticsOptions')
  console.log('inject', options)
  // const rawTags = resolveTags(options)
  const rawTags = []
  const proxyFunc: Gtag = gtag

  function initializeAnalytics() {
    if (!window.dataLayer) {
      initializeGtag(options.tags)
    }

    const script = document.head.querySelector('script[data-gtag]')
    if (!script) {
      useHead({
        script: [
          {
            'src': 'https://www.googletagmanager.com/gtag/js',
            'data-gtag': ''
          }
        ]
      })
    }
  }

  function findTag(id: string) {
    const tag = rawTags.find(x => x.id === id)

    if (!tag) {
      throw new Error('Google Tag ID does not exist')
    }

    return tag
  }

  function enable(id: string) {
    enableTracking(findTag(id))
  }

  function disable(id: string) {
    disableTracking(findTag(id))
  }

  return {
    gtag: proxyFunc,
    initializeAnalytics,
    enable,
    disable
  }
}

/**
 * Composable used to fired events on one or multiple
 * registered Google Analytics tags
 */
export function useAnalyticsEvent(...args: GtagCommands['event']) {
  const { gtag } = useGtag()
  gtag('event', ...args)
}

/**
 * Composable used to specifically track
 * events for Google Ads
 *
 * @see {@link https://support.google.com/google-ads/answer/7548399?hl=en&sjid=16743854780992520317-EU google-tag-for-ads}
 */
export function useGoogleAdsEvent() {
  const { gtag } = useGtag()

  function trackConversion(label: string, value: string | number, currency: string) {
    gtag('event', 'conversion', {
      send_to: label,
      value,
      currency
    })
  }

  /**
   * This tag should be added to the pages on your
   * website where the phone number you’d like to track
   * appears. Ensure you have a valid Google Ad
   * tag present on your page
   *
   * @example
   * This tag is equivalent to:
   * gtag('set', { 'phone_conversion_number': '1-650-555-5555', 'phone_conversion_ids': ['AW-CONVERSION_ID/CONVERSION_LABEL'] })
   * gtag('config', 'AW_CONVERSION_ID')
   */
  function trackPhoneNumber(phoneNumber: string, conversionIds: string[]) {
    const { gtag } = useGtag()
    gtag('set', null, {
      phone_conversion_number: phoneNumber,
      phone_conversion_ids: conversionIds
    })
  }

  return {
    trackConversion,
    trackPhoneNumber
  }
}
