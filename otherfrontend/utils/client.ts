export interface LoginApiResponse {
  access: string
  refresh: string
}

export type TokenRefreshApiResponse = Pick<LoginApiResponse, 'access'>

/**
 * Helper function used to ask for a new access
 * token for the user
 * @param refresh Referesh token
 */
export async function refreshAccessToken(refresh: string) {
  const response = await $fetch<TokenRefreshApiResponse>('/auth/v1/refresh/token/', {
    baseURL: useRuntimeConfig().public.prodDomain,
    method: 'POST',
    body: {
      refresh
    }
  })

  return {
    access: response.access
  }
}

/**
 * Function used to login the user in the frontend
 * @param email User's email address
 * @param password User's password
 */
export async function login(email: string, password: string) {
  if (import.meta.server) {
    return {
      access: '',
      refresh: ''
    }
  }

  const failureCount = ref(0)

  const response = await $fetch<LoginApiResponse>('/auth/v1/token/', {
    baseURL: useRuntimeConfig().public.prodDomain,
    method: 'POST',
    body: {
      username: email,
      password
    },
    onRequestError() {
      failureCount.value += 1
    }
  })

  return {
    failureCount,
    access: response.access,
    refresh: response.refresh
  }
}

export async function logout() {
  if (import.meta.server) {
    return
  }

  const accessToken = useCookie('access')
  const refreshToken = useCookie('refresh')

  accessToken.value = null
  refreshToken.value = null

  // router.push('/')
}
