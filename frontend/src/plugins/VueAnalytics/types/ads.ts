export interface PhoneTrackingParams {
  /**
   * Phone number to track on the page
   */
  phone_conversion_number: string
  /**
   * Phone number conversion ID and conversion labels
   * to use for the tracking
   */
  phone_conversion_ids: string[]
}

// export interface AdParams extends PhoneTrackingParams {
//   allow_ad_personalization_signals?: boolean
// }

/**
 * Events specific to Google Ads but that can also
 * be used in the gtag
 */
export type GoogleAdEvents = 'conversion'
