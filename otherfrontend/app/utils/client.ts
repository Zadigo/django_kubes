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
export async function refreshAccessToken(refresh: string, endpoint: string = '/auth/v1/refresh/token/') {
  const response = await $fetch<TokenRefreshApiResponse>(endpoint, {
    baseURL: useRuntimeConfig().public.prodDomain,
    method: 'POST',
    body: {
      refresh
    }
  })

  return {
    /**
     * Access token used to authenticate the user
     */
    access: response.access
  }
}

/**
 * Function used to login the user in the frontend
 * @param email User's email address
 * @param password User's password
 */
export async function login<T extends LoginApiResponse>(email: string, password: string, endpoint: string = '/auth/v1/token/') {
  if (import.meta.server) {
    return {
      access: '',
      refresh: ''
    }
  }

  const failureCount = ref<number>(0)

  const response = await $fetch<T>(endpoint, {
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
    /**
     * Number of times the request failed
     */
    failureCount,
    /**
     * Access token used to authenticate the user
     */
    access: response.access,
    /**
     * Refresh token used to refresh the access token
     */
    refresh: response.refresh
  }
}

/**
 * Function used to logout the user
 */
export async function logout() {
  if (import.meta.server) {
    return
  }

  const accessToken = useCookie('access')
  const refreshToken = useCookie('refresh')

  accessToken.value = null
  refreshToken.value = null
}
