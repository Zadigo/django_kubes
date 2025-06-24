/**
 *
 */
export function useWebsocketUtilities() {
  /**
   * Return the url to use with the websocket
   * @param path Path to the url
   */
  function defineWebsocketDomain(path: string) {
    if (import.meta.client) {
      const config = useRuntimeConfig()
      const url = config.public.prodDomain || null
  
      
      if (url) {
        let domain: string = ''
    
        if (url.startsWith('https://')) {
          domain = url.replace('https', 'wss')
        }
        
        if (url.startsWith('http')) {
          domain = url.replace('http', 'ws')
        }
  
        const obj = new URL(path, domain)
        return obj.toString()
      }
    }
  }

  /**
   * Send data to the websocket 
   * @param data Data to be sent
   */
  function sendMessage<T>(data: T) {
    if (import.meta.client) {
      return JSON.stringify(data)
    }
  }

  /**
   * Parse data from the websocket
   * @param data Data to be received
   * @returns 
   */
  function parseMessage<T>(data: string): T | undefined {
    if (import.meta.client) {
      return JSON.parse(data)
    }
  }
  
  return {
    defineWebsocketDomain,
    parseMessage,
    sendMessage
  }
}
