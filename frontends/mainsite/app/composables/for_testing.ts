export function useForTesting() {
  const isTesting = ref(false)

  return {
    isTesting
  }
}
