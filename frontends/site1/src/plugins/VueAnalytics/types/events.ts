import type { GoogleAdEvents } from './ads'

/**
 * Default Analytics events
 *
 * Reference:
 * @see {@link https://developers.google.com/tag-platform/gtagjs/reference/events events-reference}
 */
export type EventNames = 'add_payment_info'
  | 'add_shipping_info'
  | 'add_to_cart'
  | 'add_to_wishlist'
  | 'begin_checkout'
  | 'checkout_progress'
  | 'earn_virtual_currency'
  | 'exception'
  | 'generate_lead'
  | 'join_group'
  | 'level_end'
  | 'level_start'
  | 'level_up'
  | 'login'
  | 'page_view'
  | 'post_score'
  | 'purchase'
  | 'refund'
  | 'remove_from_cart'
  | 'screen_view'
  | 'search'
  | 'select_content'
  | 'select_item'
  | 'select_promotion'
  | 'set_checkout_opon'
  | 'share'
  | 'sign_up'
  | 'spend_virtual_currency'
  | 'tutorial_begin'
  | 'tutorial_complete'
  | 'unlock_achievement'
  | 'timing_complete'
  | 'view_cart'
  | 'view_item'
  | 'view_item_list'
  | 'view_promotion'
  | 'view_search_results'
  | GoogleAdEvents
// close_unconvert_lead
// disqualify_lead
// qualify_lead
// working_lead

export type Currency = string | number

/**
 * The items for the event e.g. products, articles
 *
 * Reference:
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_item_item view-item}
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_item_list_item view-item-list}
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/reference/events#select_item_item select-item}
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/reference/events#add_to_cart_item add-to-cart}
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_cart_item view-cart}
 */
interface Item {
  item_id?: string
  item_name?: string
  affiliation?: string
  coupon?: string
  discount?: Currency
  index?: number
  item_brand?: string
  item_category?: string
  item_category2?: string
  item_category3?: string
  item_category4?: string
  item_category5?: string
  item_list_id?: string
  item_list_name?: string
  currency?: string
  item_variant?: string
  location_id?: string
  price?: Currency
  quantity?: number
  creative_name?: string
  creative_slot?: string
  promotion_id?: string
  promotion_name?: string
}

interface Promotion {
  creative_name?: string
  creative_slot?: string
  promotion_id?: string
  promotion_name?: string
}

export interface EventParams {
  checkout_option?: string
  checkout_step?: number
  content_id?: string
  content_type?: string
  coupon?: string
  currency?: string
  description?: string
  fatal?: boolean
  items?: Item[]
  method?: string
  number?: string
  promotions?: Promotion[]
  screen_name?: string
  search_term?: string
  shipping?: Currency
  tax?: Currency
  transaction_id?: string
  value?: number
  event_label?: string
  event_category?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CustomParams = Record<string, any>
