import { GtagCommands } from './commands'

// export interface GoogleTagOptions {
//   /**
//    * A tag ID to initialize
//    *
//    * @example
//    * 'G-123', 'AW-123'
//    */
//   id: string
// }

export interface TagOptions {
  /**
   * An additional Google tag ID to initialized
   *
   * @example
   * 'G-123', 'AW-123'
   */
  id: string
  /**
   * Additional commands to be executed before the tag ID is initialized
   *
   * @example
   * gtag('set', 'G-123', { custom: 1 })
   */
  commands?: {
    [K in keyof GtagCommands]: [K, ...GtagCommands[K]]
  }[keyof GtagCommands][]
  /**
   * Additional configuration for the Google tag ID, to be set
   * during initialization of the tag ID with the `config' command
   *
   * @default undefined
   */
  config?: GtagCommands['config'][1]
}

export interface AnalyticsOptions {
  /**
   * The main Google tag ID to be initialized
   * @example
   * 'G-123', 'AW-123'
   */
  id: string
  /**
   * Additional tags to be initialized
   */
  tags?: TagOptions[]
  /**
   * Whether to install the analytics scripts
   * automatically in the document's head
   *
   * @default
   * 'auto'
   */
  mode?: 'auto' | 'manual'
  /**
   * Whether to fetch the script from the network in parallell
   * or to not wait for the script and continue to process the HTML page
   * and build DOM
   *
   * @default
   * 'async'
   */
  loadingStrategy?: 'async' | 'defer'
}
