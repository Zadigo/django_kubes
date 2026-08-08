export const MYVAR = 1

export function useForTesting() {
  const isTesting = ref(false)
  const toggle = useToggle(isTesting)

  return {
    isTesting,
    toggle
  }
}

export function useTodo() {
  function search(callback?: () => void) {
    if (callback) {
      callback()
    }
  }

  return {
    search
  }
}
