export function useForTesting() {
  const isTesting = ref(false)
  const toggle = useToggle(isTesting)

  return {
    isTesting,
    toggle
  }
}
