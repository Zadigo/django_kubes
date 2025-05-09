import axios, { AxiosError, type AxiosInstance } from 'axios'
import { createSimpleClient, getDomain, type ExtendedInternalAxiosRequestConfig, type RefreshApiResposne } from "."

/**
 * Composable used to get an Axios instance on the server side.
 * The storages are not directly accessible and required special
 * SSR methods provided by Nuxt in order to be accessed
 * 
 * @param access Access token
 * @param refresh Refresh token
 * @param refreshCallback Callback function used to return the refresh token
 * @param errorCallback Callback function used on error
 */
export function useServerAxiosClient(access?: string | undefined, refresh?: string | undefined, refreshCallback?: (token: string) => void, errorCallback?: (error: AxiosError) => void) {
  const client = createSimpleClient()

  function addInterceptors(newClient: AxiosInstance) {
    newClient.interceptors.request.use(
      (config) => {
        if (access) {
          config.headers.Authorization = `Token ${access}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    newClient.interceptors.response.use(
      (response) => {
        return response
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as ExtendedInternalAxiosRequestConfig  

        if (error.response) {
          if (error.response.status === 401 && !originalRequest?._retry) {
            originalRequest._retry = true

            try {
              const authClient = axios.create({ baseURL: getDomain() })
              const response = await authClient.post<RefreshApiResposne>('/auth/v1/refresh', { refresh: refresh })

              if (refreshCallback) {
                refreshCallback(response.data.access)
              }

              return authClient
            } catch (refreshError) {
              if (errorCallback && refreshError instanceof AxiosError) {
                errorCallback(refreshError)
              }
              return Promise.reject(refreshError)
            }
          }
        }

        return Promise.reject(error)
      }
    )

    return client
  }

  const authenticatedClient = addInterceptors(client)

  return {
    client,
    authenticatedClient
  }
}

