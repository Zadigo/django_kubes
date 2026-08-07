export const useAuthentication = defineStore('authentication', () => {
  const accessToken = ref<string>()
  const refreshToken = ref<string>()

  const isAuthenticated = computed(() => {
    return typeof accessToken.value !== 'undefined' && accessToken.value !== ''
  })

  return {
    accessToken,
    refreshToken,
    isAuthenticated
  }
})
