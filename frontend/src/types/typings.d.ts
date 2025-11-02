/* eslint-disable-next-line @typescript-eslint/no-empty-interface */

import type { Icon } from '@iconify/vue'

export { }

declare module 'vue' {
  export interface GlobalComponents {
    VueIcon: typeof Icon,
  }
}
