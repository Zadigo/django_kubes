/**
 * A custom hook that provides a debounce function to limit the
 * rate at which a function can be called
 */
export function useDebounce() {
  /**
    * A function that creates a debounced version of the provided function
    *
    * @param func The function to debounce
    * @param wait The number of milliseconds to delay the function call
    * @param immediate If true, trigger the function on the leading edge instead of the trailing edge
    * @returns A debounced version of the provided function
    */
  function debounce<T extends (...args: unknown[]) => void>(func: T, wait: number, immediate: boolean = false) {
    let timeout: ReturnType<typeof setTimeout> | null = null

    // return function (this: any, ...callbackArgs: Parameters<T>) {
    return function (...callbackArgs: Parameters<T>) {
      // const context = this

      function later() {
        timeout = null

        if (!immediate) {
          // func.apply(context, callbackArgs)
          func.apply(callbackArgs)
        }
      }

      const callNow = immediate && !timeout

      if (timeout) {
        clearTimeout(timeout)
      }
      timeout = setTimeout(later, wait)

      if (callNow) {
        // func.apply(context, callbackArgs)
        func.apply(callbackArgs)
      }
    }
  }

  return {
    debounce
  }
}
