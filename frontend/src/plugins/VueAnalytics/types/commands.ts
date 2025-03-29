import type { EventNames, EventParams, CustomParams } from './events'

/**
 * Add additional configuration information to targets
 *
 * @see {@link https://developers.google.com/tag-platform/gtagjs/reference#config config-params}
 */
export interface ControlParams {
  groups?: string | string[]
  /**
   * Target ID to send to
   *
   * @example
   * gtag('event', 'conversion', {'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL', 'value': 1.0, 'currency': 'USD'})
   */
  send_to?: string | string[]
  /**
   * JavaScript callback function called when processing
   * of an event command has completed
   */
  event_callback?: () => void
  event_timeout?: number
}

export interface ConfigParams {
  page_title?: string
  page_location?: string
  page_path?: string
  send_page_view?: boolean
}

type FieldNames = 'client_id' | 'session_id' | 'gclid'

type ConsentArg = 'default' | 'update'

/**
 * Reference:
 * @see {@link https://support.google.com/tagmanager/answer/10718549#consent-types consent-types}
 * @see {@link https://developers.google.com/tag-platform/security/guides/consent consent}
 */
export interface ConsentParams {
  ad_storage?: 'granted' | 'denied'
  ad_user_data?: 'granted' | 'denied' | undefined
  ad_personalization?: 'granted' | 'denied' | undefined
  analytics_storage?: 'granted' | 'denied'
  functionality_storage?: 'granted' | 'denied'
  personalization_storage?: 'granted' | 'denied'
  security_storage?: 'granted' | 'denied'
  wait_for_update?: number
  region?: string[]
}

export interface UserParams {
  /**
   * Generated user ID to send to Analytics
   */
  user_id: string | number
}

/**
 * The base paramaters that can be passed to the gtag function
 *
 * Reference:
 * @see {@link https://developers.google.com/tag-platform/gtagjs/reference api-references}
 */
export interface GtagCommands {
  config: [
    targetId: string,
    config?: ControlParams | ConfigParams | EventParams | CustomParams | UserParams
  ]
  event: [
    name: EventNames | (string & {}),
    eventParams?: ControlParams | EventParams | CustomParams
  ]
  set: [targetId: string, config: CustomParams | boolean | string] | [config: CustomParams]
  get: [
    targetId: string,
    fieldName: FieldNames | string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback?: (field?: string | CustomParams) => any
  ]
  consent: [consentArg: ConsentArg | (string & {}), consentParams: ConsentParams]
  js: [config: Date]
}

export interface Gtag {
  <C extends keyof GtagCommands>(command: C, ...args: GtagCommands[C]): void
}
